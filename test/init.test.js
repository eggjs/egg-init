'use strict';

const fs = require('fs');
const path = require('path');
const coffee = require('coffee');
const rimraf = require('rimraf');
const assert = require('assert');

const eggInitBin = path.join(__dirname, '../bin/egg-init.js');
const tmp = path.join(__dirname, '../tmp');

describe('test/init.test.js', () => {

  afterEach(() => {
    rimraf.sync(tmp);
  });

  it.skip('should work with args --type', done => {
    coffee.fork(eggInitBin, [ '--type', 'plugin', 'tmp' ])
    .expect('stdout', /\[egg-init\] Download/)
    .expect('code', 0)
    .end((err, res) => {
      console.log(res.stdout);
      assert(!err, err && err.message);
      assert(fs.existsSync(path.join(tmp, 'package.json')));
      done();
    });
  });

});
