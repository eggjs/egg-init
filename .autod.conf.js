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
    'eslint',
    'eslint-config-egg'
  ],
  registry: 'https://r.cnpmjs.org',
};
