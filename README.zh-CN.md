# egg-init

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/eggjs/egg-init/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eggjs/egg-init/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-init.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-init
[codecov-image]: https://codecov.io/gh/eggjs/egg-init/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eggjs/egg-init
[snyk-image]: https://snyk.io/test/npm/egg-init/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-init
[download-image]: https://img.shields.io/npm/dm/egg-init.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-init

Egg 应用初始化工具，所有 Egg 应用开发必须安装。

## Install

```bash
npm i egg-init -g
egg-init -h
```

## 创建 `simple` 类型的应用

```bash
egg-init --type simple [dest]
```

## 不输入类型可以选择

```bash
$ egg-init dest
? Please select a boilerplate type (Use arrow keys)
❯ simple - Simple egg app
  plugin - egg plugin
```

## 支持的参数

```bash
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
<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/227713?v=4" width="100px;"/><br/><sub><b>atian25</b></sub>](https://github.com/atian25)<br/>|[<img src="https://avatars.githubusercontent.com/u/156269?v=4" width="100px;"/><br/><sub><b>fengmk2</b></sub>](https://github.com/fengmk2)<br/>|[<img src="https://avatars.githubusercontent.com/u/958063?v=4" width="100px;"/><br/><sub><b>thonatos</b></sub>](https://github.com/thonatos)<br/>|[<img src="https://avatars.githubusercontent.com/u/985607?v=4" width="100px;"/><br/><sub><b>dead-horse</b></sub>](https://github.com/dead-horse)<br/>|[<img src="https://avatars.githubusercontent.com/u/360661?v=4" width="100px;"/><br/><sub><b>popomore</b></sub>](https://github.com/popomore)<br/>|[<img src="https://avatars.githubusercontent.com/u/6897780?v=4" width="100px;"/><br/><sub><b>killagu</b></sub>](https://github.com/killagu)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
|[<img src="https://avatars.githubusercontent.com/u/5856440?v=4" width="100px;"/><br/><sub><b>whxaxes</b></sub>](https://github.com/whxaxes)<br/>|[<img src="https://avatars.githubusercontent.com/u/893152?v=4" width="100px;"/><br/><sub><b>jtyjty99999</b></sub>](https://github.com/jtyjty99999)<br/>|[<img src="https://avatars.githubusercontent.com/u/238841?v=4" width="100px;"/><br/><sub><b>edokeh</b></sub>](https://github.com/edokeh)<br/>|[<img src="https://avatars.githubusercontent.com/u/8369212?v=4" width="100px;"/><br/><sub><b>DanielWLam</b></sub>](https://github.com/DanielWLam)<br/>|[<img src="https://avatars.githubusercontent.com/u/36876080?v=4" width="100px;"/><br/><sub><b>Janlaywss</b></sub>](https://github.com/Janlaywss)<br/>|[<img src="https://avatars.githubusercontent.com/u/1078011?v=4" width="100px;"/><br/><sub><b>Runrioter</b></sub>](https://github.com/Runrioter)<br/>|
[<img src="https://avatars.githubusercontent.com/u/19733683?v=4" width="100px;"/><br/><sub><b>snyk-bot</b></sub>](https://github.com/snyk-bot)<br/>|[<img src="https://avatars.githubusercontent.com/u/13726797?v=4" width="100px;"/><br/><sub><b>WinjayYu</b></sub>](https://github.com/WinjayYu)<br/>|[<img src="https://avatars.githubusercontent.com/u/17093811?v=4" width="100px;"/><br/><sub><b>ShirasawaSama</b></sub>](https://github.com/ShirasawaSama)<br/>|[<img src="https://avatars.githubusercontent.com/u/26317926?v=4" width="100px;"/><br/><sub><b>supperchong</b></sub>](https://github.com/supperchong)<br/>|[<img src="https://avatars.githubusercontent.com/u/19908330?v=4" width="100px;"/><br/><sub><b>hyj1991</b></sub>](https://github.com/hyj1991)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Sat Nov 25 2023 23:06:04 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->