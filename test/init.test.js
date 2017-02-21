'use strict';

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const assert = require('power-assert');
const Helper = require('./helper');

const tmp = path.join(__dirname, '../.tmp');

const Command = require('..');

describe('test/init.test.js', () => {
  let command;
  let helper;
  before(() => {
    rimraf.sync(tmp);
    command = new Command();
    helper = new Helper(command);
  });

  afterEach(() => {
    rimraf.sync(tmp);
    helper.restore();
  });

  it('should work', function* () {
    const boilerplatePath = path.join(__dirname, 'fixtures/simple-test');
    yield command.run(tmp, [ 'simple-app', '--template=' + boilerplatePath, '--silent' ]);

    assert(fs.existsSync(path.join(command.targetDir, '.gitignore')));
    assert(fs.existsSync(path.join(command.targetDir, '.eslintrc')));
    assert(fs.existsSync(path.join(command.targetDir, 'package.json')));
    assert(fs.existsSync(path.join(command.targetDir, 'simple-app')));
    assert(fs.existsSync(path.join(command.targetDir, 'test', 'simple-app.test.js')));

    const content = fs.readFileSync(path.join(command.targetDir, 'README.md'), 'utf-8');
    assert(/# simple-app/.test(content));
  });

  it('should prompt', function* () {
    helper.mock([ helper.KEY_DOWN, [ 'test', 'this is xxx', 'TZ' ]]);
    yield command.run(tmp, [ 'prompt-app', '--force' ]);

    assert(fs.existsSync(path.join(command.targetDir, '.gitignore')));
    assert(fs.existsSync(path.join(command.targetDir, '.eslintrc')));
    assert(fs.existsSync(path.join(command.targetDir, 'package.json')));

    const content = fs.readFileSync(path.join(command.targetDir, 'README.md'), 'utf-8');
    assert(/# test/.test(content));
  });

  it('.replaceTemplate', () => {
    assert(command.replaceTemplate('hi, {{ user }}', { user: 'egg' }) === 'hi, egg');
    assert(command.replaceTemplate('hi, {{ user }}\n{{type}} {{user}}', { user: 'egg', type: 'init' }) === 'hi, egg\ninit egg');
    assert(command.replaceTemplate('hi, {{ user }}', {}) === 'hi, {{ user }}');
    assert(command.replaceTemplate('hi, \\{{ user }}', { user: 'egg' }) === 'hi, {{ user }}');
  });
});
