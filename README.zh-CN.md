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

Egg 应用初始化工具，所有 Egg 应用开发必须安装。

## Install

```bash
$ npm i egg-init -g
$ egg-init -h
```

## 创建 `simple` 类型的应用

```bash
$ egg-init --type simple [dest]
```

## 不输入类型可以选择

```bash
$ egg-init dest
? Please select a boilerplate type (Use arrow keys)
❯ simple - Simple egg app
  plugin - egg plugin
```

## 支持的参数

```
Usage: egg-init [dir] --type=simple

Options:
  --type          boilerplate type                                                [string]
  --dir           target directory                                                [string]
  --force, -f     force to override directory                                     [boolean]
  --template      local path to boilerplate                                       [string]
  --package       boilerplate package name                                        [string]
  --registry, -r  npm registry, support china/npm/custom, default to auto detect  [string]
  --silent        don't ask, just use default value                               [boolean]
  --version       Show version number                                             [boolean]
  -h, --help      Show help                                                       [boolean]
```

## 自定义模板

自定义模板采用 npm 包的形式管理

- 新建仓库如 [egg-boilerplate-plugin](https://github.com/eggjs/egg-boilerplate-plugin)
- boilerplate 目录下存放所有的初始化文件
- 可以使用 `egg-init --template=PATH` 本地检查生成效果
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

- 更新依赖关系，只需要指定你的包名，更新到 [egg-init-config](https://github.com/eggjs/egg-init-config) 这个模块的 package.json 中 `config.boilerplate` 字段
- 发布模板（和配置）到 npm

## License

[MIT](LICENSE)
