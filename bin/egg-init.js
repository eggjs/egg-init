#!/usr/bin/env node

'use strict';

const Command = require('..');

new Command().run(process.cwd(), process.argv.slice(2)).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
