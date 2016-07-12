egg-init
=======

Egg 应用初始化工具，所有 Egg 应用开发必须安装。

## Install

```bash
$ npm i egg-init -g
$ egg-init -h
```

## 创建 simeple 类型的应用

```bash
$ egg-init --type sime [dest]
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

1. 新建仓库如 https://github.com/eggjs/egg-boilerplate-plugin
1. boilerplate 目录下存放所有的初始化文件
1. index.js 文件可以声明要替换的变量，在 boilerplate 文件夹中写模板的时候，可以通过 `{{name}}` 占位符的方式进行替换

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

1. 更新依赖关系，只需要指定你的包名，更新到 https://github.com/eggjs/egg-init-config 这个模块的 pacakge.json 中 `config.boilerplate` 字段
1. 发布模板（和配置）到 npm

## License

[MIT](LICENSE)
