egg-init
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-init.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-init
[travis-image]: https://img.shields.io/travis/eggjs/egg-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-init
[codecov-image]: https://codecov.io/gh/eggjs/egg-init/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eggjs/egg-init
[david-image]: https://img.shields.io/david/eggjs/egg-init.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-init
[snyk-image]: https://snyk.io/test/npm/egg-init/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-init
[download-image]: https://img.shields.io/npm/dm/egg-init.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-init

Init egg app helper tools.

## Install

```bash
$ npm i egg-init -g
$ egg-init -h
```

## Create a `simple` type application

```bash
$ egg-init --type simple [dest]
```

## Or select a boilerplate by yourself

```bash
$ egg-init dest
? Please select a boilerplate type (Use arrow keys)
❯ simple - Simple egg app
  plugin - egg plugin
```

## Custom a boilerplate

We use npm package to manager boilerplate, you can follow this steps:

- Create a new repo like [egg-boilerplate-plugin](https://github.com/eggjs/egg-boilerplate-plugin)
- Put all files under `boilerplates` dir
- Use `egg-init --template=PATH` to check
- `index.js` can define variables which can be useed on template, like `{{name}}`.

    ```js
    module.exports = {
      name: {
        desc: 'plugin-name',
      },
      description: {
        desc: 'my best plugin',
      },
      author: {
        desc: 'fengmk2',
      },
    };
    ```

- Add your package name to [egg-init-config](https://github.com/eggjs/egg-init-config)'s package.json `config.boilerplate` property
- Publish your package to npm

## License

[MIT](LICENSE)
