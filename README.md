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

## Create a `simeple` type application.

```bash
$ egg-init --type simple [dest]
```

## 不输入类型可以选择

```bash
$ egg-init dest
? 请选择应用类型 (Use arrow keys)
  buc - 适用于基于 buc 的阿里内部应用
❯ ali - 适用于阿里集团对外应用
  alipay - 适用于支付宝普通应用
  react - 适用于支付宝 react 应用
  plugin - egg 插件
```

## 自定义模板

自定义模板采用 npm 包的形式管理

- 新建仓库如 [egg-boilerplate-plugin](https://github.com/eggjs/egg-boilerplate-plugin)
- boilerplate 目录下存放所有的初始化文件
- index.js 文件可以声明要替换的变量，在 boilerplate 文件夹中写模板的时候，可以通过 `{{name}}` 占位符的方式进行替换

```js
module.exports = {
  name: {
    desc: '插件名',
  },
  description: {
    desc: '插件描述',
  },
  author: {
    desc: '作者',
  },
};
```

- 更新依赖关系，只需要指定你的包名，更新到 [egg-init-config](https://github.com/eggjs/egg-init-config) 这个模块的 pacakge.json 中 `config.boilerplate` 字段
- 发布模板（和配置）到 npm

## License

[MIT](LICENSE)
