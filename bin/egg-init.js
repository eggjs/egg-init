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
const pkg = require('../package.json');

require('colors');

const REGISTRY = 'https://registry.npm.taobao.org';
const CONFIG_URL = `${REGISTRY}/egg-init-config/latest`;

co(function* () {
  // check cli update
  yield updater({
    package: pkg,
    registry: REGISTRY,
  });
  const boilerplate = yield getBoilerplates();
  const keys = Object.keys(boilerplate);

  program
    .usage('[--type alipay] [dest]')
    .version(pkg.version)
    .option('--type [type]', `boilerplate type, choices [${keys}]`)
    .parse(process.argv);

  const type = yield getType(program.type, boilerplate);
  const dest = yield getDest();
  const templateDir = yield downloadTemplates(boilerplate[type].package);
  const src = path.join(templateDir, 'boilerplate');
  const vars = yield getVars(templateDir);

  yield copyTo(src, dest, vars);
  rimraf.sync(templateDir);
  log(`Clean up ${templateDir}`);
  process.exit(0);
}).catch(err => {
  console.error(err.stack);
  process.exit(1);
});

function* getBoilerplates() {
  let pkg;
  try {
    const res = yield urllib.request(CONFIG_URL, {
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
    if (fs.existsSync(dest)) {
      if (!fs.statSync(dest).isDirectory()) {
        log(`${dest.red} already exists as a file`);
        dest = null;
        continue;
      }
      const files = fs.readdirSync(dest);
      if (files.length > 1 || files[0] !== '.git') {
        log(`${dest.red} already exists and not empty`);
        dest = null;
        continue;
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
  const url = `http://registry.npm.alibaba-inc.com/${module}/latest`;
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
