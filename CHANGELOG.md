# Changelog

## [3.0.0](https://github.com/eggjs/egg-init/compare/v2.3.1...v3.0.0) (2023-11-25)


### ⚠ BREAKING CHANGES

* drop Node.js < 16 support

- Drop http proxy support

### Features

* drop Node.js < 16 support ([#82](https://github.com/eggjs/egg-init/issues/82)) ([0fd85c4](https://github.com/eggjs/egg-init/commit/0fd85c4d2a2f64c99b1f9a27fa55805a45bde6ac))


### Bug Fixes

* ci failed on windows ([#73](https://github.com/eggjs/egg-init/issues/73)) ([4353482](https://github.com/eggjs/egg-init/commit/4353482f11ae2c1269c0f7cedcc23ea81e95286f))

2.3.0 / 2021-11-10
==================

**features**
  * [[`d88f359`](http://github.com/eggjs/egg-init/commit/d88f359d6f9b6668e3309d3f1d055b27e8a76aa6)] - feat: Update taobao npm registry url (Janlay <<36876080+Janlaywss@users.noreply.github.com>>)
2.2.0 / 2020-08-19
==================

**features**
  * [[`4b6429a`](http://github.com/eggjs/egg-init/commit/4b6429a1273e48d178e33547ac3136236221b791)] - feat: support sub dir mapping (#64) (Suyi <<thonatos.yang@gmail.com>>)
  * [[`3d602df`](http://github.com/eggjs/egg-init/commit/3d602df304ed03d71177be0eca32a02601d37082)] - feat: add .eslintrc (#63) (Suyi <<thonatos.yang@gmail.com>>)

2.0.0 / 2020-08-04
==================

**features**
  * [[`77acca1`](http://github.com/eggjs/egg-init/commit/77acca1f1b8f5e9b8e53ee575e2571cd98f88b1b)] - feat: support symbolic link [BREAK CHANGE] (#62) (killa <<killa123@126.com>>)

1.17.3 / 2019-12-09
==================

**fixes**
  * [[`55b93ec`](http://github.com/eggjs/egg-init/commit/55b93ec79da90300da9f0067a606713565b34039)] - fix: block in win (#58) (supperchong <<2267805901@qq.com>>)

1.17.2 / 2019-07-03
==================

**fixes**
  * [[`5508749`](http://github.com/eggjs/egg-init/commit/55087492bd5a26601ab13edabdd824278721e848)] - fix: add timeout when getPackageInfo (#54) (TZ | 天猪 <<atian25@qq.com>>)

1.17.1 / 2019-04-24
==================

**fixes**
  * [[`d816803`](http://github.com/eggjs/egg-init/commit/d816803cb5ec9afcee13d7408e90414aaeaec525)] - fix: remove encoding setting to read files (#53) (Yu Wenjie <<winjayyu@gmail.com>>)

1.17.0 / 2019-04-17
==================

**features**
  * [[`36f2d86`](http://github.com/eggjs/egg-init/commit/36f2d86493f466a603cbd9bd40d76eab969d1e04)] - feat: question support other type from inquirer (#51) (Haoliang Gao <<sakura9515@gmail.com>>)

1.16.1 / 2019-03-28
==================

**fixes**
  * [[`f9734d4`](http://github.com/eggjs/egg-init/commit/f9734d4e243dbc8809a3b7b9503bd21db104f151)] - fix: deprecated info (#50) (TZ | 天猪 <<atian25@qq.com>>)

1.16.0 / 2019-03-28
==================

**features**
  * [[`a1512e4`](http://github.com/eggjs/egg-init/commit/a1512e47eef8a7f4af8561946a5bb486eb24e2f0)] - feat: add deprecate message (#49) (TZ | 天猪 <<atian25@qq.com>>)

1.15.1 / 2019-02-22
==================

**fixes**
  * [[`318fc69`](http://github.com/eggjs/egg-init/commit/318fc695d6ec0f7df092b8d56e1cfc04b7bef793)] - fix: mem fs bugs in windows  (#48) (吖猩 <<whxaxes@qq.com>>)

**others**
  * [[`0704648`](http://github.com/eggjs/egg-init/commit/070464810136691c615d6c5a8862facbf68e768f)] - deps: upgrade dependencies (#46) (Haoliang Gao <<sakura9515@gmail.com>>)

1.15.0 / 2018-09-12
===================

  * feat: change isTextPath to istextorbinary (#42)

1.14.1 / 2018-08-08
==================

**fixes**
  * [[`c7015a3`](http://github.com/eggjs/egg-init/commit/c7015a3c3ca11412de0ba3c72e7744a464bdf8ae)] - fix: package.json to reduce vulnerabilities (#41) (Snyk bot <<snyk-bot@snyk.io>>)

1.14.0 / 2018-05-04
==================

**features**
  * [[`ca21ba1`](http://github.com/eggjs/egg-init/commit/ca21ba12dcc4a558064d57b6fe8ff6cef92aa903)] - feat: add npmignore (#39) (Chaos（拾锋） <<edokeh@163.com>>)

1.13.0 / 2017-12-12
===================

**features**
  * [[`72f7cde`](https://github.com/eggjs/egg-init/commit/72f7cde15b1a7ebf04d8bd93e7f4fe5fc56e9d37)] - feat: only processTemplate with text file (#35) (TZ | 天猪 <<atian25@qq.com>>)
  * [[`d98cff6`](https://github.com/eggjs/egg-init/commit/d98cff6be7a1fc13c51bf8539ad138b1f35f0d53)] - feat: support http_proxy (#36) (TZ | 天猪 <<atian25@qq.com>>)

1.12.0 / 2017-10-18
==================

**features**
  * [[`8c8930e`](http://github.com/eggjs/egg-init/commit/8c8930eff649aa3b0f414c724c31d3cbdf2a30a2)] - feat: change default register to npm (#33) (TZ | 天猪 <<atian25@qq.com>>)

1.11.0 / 2017-07-27
==================

  * feat: support custom egg-init config (#32)

1.10.1 / 2017-07-27
==================

  * fix: set display page size (#31)

1.10.0 / 2017-06-12
===================

  * feat: Registry of npm-updater should be set (#28)

1.9.2 / 2017-05-20
==================

  * fix: mz-modules should be dep (#27)

1.9.1 / 2017-05-19
==================

  * fix: remove temp dir (#26)

1.9.0 / 2017-05-10
==================

  * feat: askVars support function and filter (#25)

1.8.1 / 2017-03-01
==================

  * feat: more friendly warning when fetch npm info got error (#23)

1.8.0 / 2017-02-26
==================

  * feat: support download npm package (#22)

1.7.0 / 2017-02-22
==================

  * feat: remove boring meta info (#21)

1.6.1 / 2016-12-23
==================

  * fix: help typo && update deps (#20)

1.6.0 / 2016-12-02
==================

  * feat:support name replace (#19)

1.5.1 / 2016-11-28
==================

  * fix: error message when boilerplate config missing (#18)

1.5.0 / 2016-11-21
==================

  * feat: add test support (#15)

1.4.2 / 2016-11-09
==================

  * chore: pkg files (#14)

1.4.1 / 2016-11-09
==================

  * feat: npm-updater params (#13)

1.4.0 / 2016-11-09
==================

  * refactor: use class style (#12)

1.3.0 / 2016-11-09
==================

  * fix: detect .cnpmrc and .tnpmrc (#11)

1.2.2 / 2016-10-14
==================

  * refactor: use inquirer to collect user input (#10)

1.2.1 / 2016-09-12
==================

  * fix: use taobao to detect ip && fallback with .npmrc (#9)

1.2.0 / 2016-09-10
==================

  * feat: auto choose npm registry url (#7)

1.1.1 / 2016-09-02
==================

  * chore: update usage tip (#6)

1.1.0 / 2016-08-31
==================

  * feat: support local test (#4)

1.0.2 / 2016-08-29
==================

  * reinit project
