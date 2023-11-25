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

Init egg app helper tools.

## Install

```bash
npm i egg-init -g
egg-init -h
```

## Create a `simple` type application

```bash
egg-init --type simple [dest]
```

## Or select a boilerplate by yourself

```bash
$ egg-init dest
? Please select a boilerplate type (Use arrow keys)
❯ simple - Simple egg app
  plugin - egg plugin
```

## Command

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

## Custom a boilerplate

We use npm package to manager boilerplate, you can follow this steps:

- Create a new repo like [egg-boilerplate-plugin](https://github.com/eggjs/egg-boilerplate-plugin)
- Put all files under `boilerplate` dir
- Use `egg-init --template=PATH` to check
- `index.js` can define variables which can be useed on template, like `{{name}}`, but `\{{name}}` will ignore.

```js
module.exports = {
  name: {
    desc: 'package-name',
  },
  pluginName: {
    desc: 'plugin-name',
    default(vars) {
      return vars.name;
    },
    filter(v) {
      return 'egg-' + v;
    },
  },
  description: {
    desc: 'my best plugin',
  },
  author: {
    desc: 'author',
    default: 'eggjs team'
  },
};
```

- Write unit test, see `npm scripts` at [egg-boilerplate-simple](https://github.com/eggjs/egg-boilerplate-simple/blob/master/package.json#L5)
- Add your package name to [egg-init-config](https://github.com/eggjs/egg-init-config)'s package.json `config.boilerplate` property
- Publish your package to npm

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
