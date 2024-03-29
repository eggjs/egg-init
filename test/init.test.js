const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('mz-modules/rimraf');
const assert = require('assert');
const Helper = require('./helper');

const tmp = path.join(__dirname, '../.tmp');
const isWindows = os.platform() === 'win32';

const Command = require('..');

describe('test/init.test.js', () => {
  let command;
  let helper;
  before(async () => {
    await rimraf(tmp);
    command = new Command();
    helper = new Helper(command);
  });

  beforeEach(() => rimraf(tmp));

  afterEach(async () => {
    await rimraf(tmp);
    helper.restore();
  });

  it('should work', async () => {
    const boilerplatePath = path.join(__dirname, 'fixtures/simple-test');
    await command.run(tmp, [ 'simple-app', '--template=' + boilerplatePath, '--silent' ]);

    assert(fs.existsSync(path.join(command.targetDir, '.gitignore')));
    assert(fs.existsSync(path.join(command.targetDir, '.eslintrc')));
    assert(fs.existsSync(path.join(command.targetDir, '.npmrc')));
    assert(fs.existsSync(path.join(command.targetDir, '.npmignore')));
    assert(fs.existsSync(path.join(command.targetDir, 'package.json')));
    assert(fs.existsSync(path.join(command.targetDir, 'simple-app')));
    assert(fs.existsSync(path.join(command.targetDir, 'view', '.eslintrc')));
    assert(fs.existsSync(path.join(command.targetDir, 'test', 'simple-app.test.js')));
    assert(fs.existsSync(path.join(command.targetDir, 'resource', 'doc', 'index.md')));
    assert(isWindows ? true : fs.lstatSync(path.join(command.targetDir, 'doc')).isSymbolicLink());
    assert(isWindows ? true : fs.existsSync(path.join(command.targetDir, 'doc', 'index.md')));

    const content = fs.readFileSync(path.join(command.targetDir, 'README.md'), 'utf-8');
    assert(/# simple-app/.test(content));
  });

  it('.replaceTemplate', () => {
    assert(command.replaceTemplate('hi, {{ user }}', { user: 'egg' }) === 'hi, egg');
    assert(command.replaceTemplate('hi, {{ user }}\n{{type}} {{user}}', { user: 'egg', type: 'init' }) === 'hi, egg\ninit egg');
    assert(command.replaceTemplate('hi, {{ user }}', {}) === 'hi, {{ user }}');
    assert(command.replaceTemplate('hi, \\{{ user }}', { user: 'egg' }) === 'hi, {{ user }}');
  });

  it('should works with remote boilerplate', async () => {
    await command.run(tmp, [ 'simple-app', '--type=simple', '--silent' ]);

    assert(fs.existsSync(path.join(command.targetDir, '.gitignore')));
    assert(fs.existsSync(path.join(command.targetDir, '.eslintrc')));
    assert(fs.existsSync(path.join(command.targetDir, 'package.json')));
    assert(fs.existsSync(path.join(command.targetDir, 'package.json')));
    assert(fs.existsSync(path.join(command.targetDir, 'test/app/controller/home.test.js')));
    assert(fs.existsSync(path.join(command.targetDir, 'app/controller/home.js')));
  });

  if (!process.env.CI) {
    it('should work with prompt', async () => {
      helper.mock([[ 'simple-app', 'this is xxx', 'TZ', helper.KEY_ENTER, 'test', helper.KEY_ENTER ]]);
      const boilerplatePath = path.join(__dirname, 'fixtures/simple-test');
      await command.run(tmp, [ 'simple-app', '--force', '--template=' + boilerplatePath ]);

      assert(fs.existsSync(path.join(command.targetDir, '.gitignore')));
      assert(fs.existsSync(path.join(command.targetDir, '.eslintrc')));
      assert(fs.existsSync(path.join(command.targetDir, 'package.json')));
      assert(fs.existsSync(path.join(command.targetDir, 'simple-app')));
      assert(fs.existsSync(path.join(command.targetDir, 'test', 'simple-app.test.js')));

      const content = fs.readFileSync(path.join(command.targetDir, 'README.md'), 'utf-8');
      assert(/default-simple-app/.test(content));
      assert(/filter-test/.test(content));
      assert(/listA/.test(content));
    });

    it('should prompt', async () => {
      helper.mock([ helper.KEY_DOWN, [ 'test', 'this is xxx', 'TZ', helper.KEY_ENTER ]]);
      await command.run(tmp, [ 'prompt-app', '--force' ]);

      assert(fs.existsSync(path.join(command.targetDir, '.gitignore')));
      assert(fs.existsSync(path.join(command.targetDir, 'package.json')));

      const content = fs.readFileSync(path.join(command.targetDir, 'README.md'), 'utf-8');
      assert(/Development/.test(content));
    });
  }
});
