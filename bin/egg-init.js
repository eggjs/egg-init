#!/usr/bin/env node

'use strict';

const os = require('os');
const program = require('commander');
const vfs = require('vinyl-fs');
const fs = require('fs');
const inquirer = require('inquirer');
const through = require('through2');
const path = require('path');
const rimraf = require('rimraf');
const zlib = require('zlib');
const tar = require('tar');
const co = require('co');
const urllib = require('urllib');
const updater = require('npm-updater');
const mkdirp = require('mkdirp');
const execSync = require('child_process').execSync;
const pkg = require('../package.json');

require('colors');

let registryUrl;

co(function* () {
  // get registry url by location
  registryUrl = yield getRegistryUrl();

  // check cli update
  yield updater({
    package: pkg,
    registry: registryUrl,
  });
  const boilerplate = yield getBoilerplates();
  const keys = Object.keys(boilerplate);

  program
    .usage('[--type simple] [dest]')
    .version(pkg.version)
    .option('--type [type]', `boilerplate type, choices [${keys}]`)
    .option('--template [template]', 'local boilerplate template path')
    .option('--force', 'force to override if dest exists')
    .parse(process.argv);

  const dest = yield getDest();

  let templateDir;
  if (program.template) {
    templateDir = path.resolve(process.cwd(), program.template);
    if (!fs.existsSync(templateDir)) {
      log(`${templateDir.red} is not exists, exit...`);
      process.exit(1);
    }
    if (!fs.existsSync(path.join(templateDir, 'boilerplate'))) {
      log(`${templateDir.red} should contain boilerplate folder, exit...`);
      process.exit(1);
    }
    log(`local template dir is ${templateDir.green}`);
  } else {
    const type = yield getType(program.type, boilerplate);
    templateDir = yield downloadTemplates(boilerplate[type].package);
  }

  const src = path.join(templateDir, 'boilerplate');
  const vars = yield getVars(templateDir);

  yield copyTo(src, dest, vars);

  if (!program.template) {
    rimraf.sync(templateDir);
    log(`Clean up ${templateDir}`);
  }

  log(`Usage:
    - cd ${dest}
    - npm install
    - npm start / npm run dev / npm test
  `);

  process.exit(0);
}).catch(err => {
  console.error(err.stack);
  process.exit(1);
});

function* getBoilerplates() {
  let pkg;
  try {
    const res = yield urllib.request(`${registryUrl}/egg-init-config/latest`, {
      dataType: 'json',
      followRedirect: true,
    });
    pkg = res.data;
  } catch (err) {
    pkg = require('egg-init-config/package.json');
  }
  return pkg.config.boilerplate;
}

function* getType(type, boilerplate) {
  if (type && boilerplate[type]) {
    return type;
  }

  const choices = Object.keys(boilerplate).map(key => {
    return {
      name: `${key} - ${boilerplate[key].description}`,
      value: key,
    };
  });

  const answers = yield prompt({
    name: 'type',
    type: 'list',
    message: 'Please select a boilerplate type',
    choices,
  });
  return answers.type;
}

function* getDest() {
  let inputDest = program.args[0];
  let dest = null;

  while (!dest) {
    dest = inputDest || (yield ask('Please enter dest dir (default is current dir): ')) || '.';
    inputDest = null;
    dest = path.resolve(process.cwd(), dest);
    if (!fs.existsSync(dest)) {
      log(`${dest.red} is not exists, now create it.`);
      mkdirp.sync(dest);
    } else {
      if (!fs.statSync(dest).isDirectory()) {
        log(`${dest.red} already exists as a file`);
        dest = null;
        continue;
      }
      const files = fs.readdirSync(dest).filter(name => name[0] !== '.');
      if (files.length > 0) {
        if (program.force) {
          log(`${dest} already exists and will be override due to --force`.red);
        } else {
          log(`${dest.red} already exists and not empty: ${JSON.stringify(files)}`);
          dest = null;
          continue;
        }
      }
    }

    log(`dest dir is ${dest.green}`);
    return dest;
  }
}

function* getVars(questionFile) {
  let questions;
  try {
    questions = require(questionFile);
  } catch (err) {
    return {};
  }

  const keys = Object.keys(questions);
  const vars = {};
  if (keys.length) {
    log('Initing boilerplate config...');
  }
  for (const key of keys) {
    const question = questions[key] || {};
    let desc = question.desc;
    if (question.default) {
      desc = `${desc}(${question.default})`;
    }
    desc += ': ';
    let value = yield ask(desc);
    value = value || question.default || '';
    vars[key] = value;
  }
  return vars;
}

function* downloadTemplates(module) {
  const url = `${registryUrl}/${module}/latest`;
  const result = yield urllib.request(url, {
    dataType: 'json',
  });
  const saveDir = path.join(os.tmpdir(), 'egg-init-boilerplate');
  const tgzUrl = result.data.dist.tarball;
  yield downloadAndUnzip(tgzUrl, saveDir);
  log(`Download ${tgzUrl} into ${saveDir}`);
  return saveDir;
}

function downloadAndUnzip(url, saveDir) {
  return function(callback) {
    rimraf.sync(saveDir);
    function handleError(err) {
      rimraf.sync(saveDir);
      callback(err);
    }

    urllib.request(url, {
      followRedirect: true,
      streaming: true,
    }, (err, _, res) => {
      if (err) {
        return callback(err);
      }

      const gunzip = zlib.createGunzip();
      gunzip.on('error', handleError);

      const extracter = tar.Extract({ path: saveDir, strip: 1 });
      extracter.on('error', handleError);
      extracter.on('end', callback);

      res.pipe(gunzip).pipe(extracter);
    });
  };
}

function template(dest, src, vars) {
  return through.obj(function(file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    if (/\/gitignore/.test(file.path)) {
      file.path = file.path.replace(/gitignore$/, '.gitignore');
    }

    log('Write %s', simplifyFilename(file.path.replace(src, dest)));
    const content = replace(file.contents.toString(), vars);

    file.contents = new Buffer(content);
    this.push(file);
    cb();
  });
}

function copyTo(src, dest, vars) {
  return function(callback) {
    vfs.src('**/*', { cwd: src, cwdbase: true, dot: true })
      .pipe(template(dest, src, vars))
      .pipe(vfs.dest(dest))
      .on('end', callback)
      .on('error', callback)
      .resume();
  };
}

function* getRegistryUrl() {
  let url = 'https://registry.npmjs.org';
  try {
    // check ip, auto choose
    const result = yield urllib.request('http://ip.taobao.com/service/getIpInfo.php?ip=myip', { dataType: 'json' });
    const ipInfo = result.data && result.data.data;
    if (ipInfo && ipInfo.country_id === 'CN') {
      url = 'https://registry.npm.taobao.org';
      log(`ip: ${ipInfo.ip}, china, use: ${url.green}`);
    }
  } catch (err) {
    // support .npmrc
    const fallbackUrl = execSync('npm config get registry', { encoding: 'utf8' });
    url = fallbackUrl.trim().replace(/\/$/, '');
    log(`use fallback registry url: ${url}`.red);
  }
  return url;
}

function simplifyFilename(filename) {
  return filename.replace(process.cwd(), '.');
}

function log() {
  const args = Array.prototype.slice.call(arguments);
  args[0] = '[egg-init] '.blue + args[0];
  console.log.apply(console, args);
}

function prompt(question) {
  return cb => {
    inquirer.prompt([ question ], answers => {
      cb(null, answers);
    });
  };
}

function ask(desc) {
  return cb => {
    process.stdout.write(desc.grey);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', data => {
      cb(null, data.trim());
    }).resume();
  };
}

function replace(content, vars) {
  return content.replace(/{{ *(\w+) *}}/g, (block, key) => {
    return vars.hasOwnProperty(key)
      ? vars[key]
      : block;
  });
}
