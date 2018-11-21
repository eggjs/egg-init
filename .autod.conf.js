'use strict';

module.exports = {
  write: true,
  prefix: '^',
  devprefix: '^',
  exclude: [
    'test/fixtures',
  ],
  dep: [
    'egg-init-config',
  ],
  devdep: [
    'autod',
    'egg-bin',
    'egg-ci',
    'eslint',
    'eslint-config-egg'
  ],
  semver: [
    'egg-bin@1',
    'inquirer@3',
    'eslint@4',
    'eslint-config-egg@6',
    'mem-fs-editor@4',
    'yargs@11',
    'proxy-agent@2',
  ],
  registry: 'https://r.cnpmjs.org',
};
