'use strict';

module.exports = {
  write: true,
  prefix: '^',
  devprefix: '^',
  exclude: [
    'test/fixtures',
  ],
  semver: [
    'egg-bin@1',
    'inquirer@3',
  ],
  dep: [
    'egg-init-config',
  ],
  devdep: [
    'autod',
    'egg-bin',
    'eslint',
    'eslint-config-egg'
  ],
  registry: 'https://r.cnpmjs.org',
};
