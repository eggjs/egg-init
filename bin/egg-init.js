#!/usr/bin/env node

const Command = require('..');

(async () => {
  await new Command().run(process.cwd(), process.argv.slice(2));
})().catch(err => {
  console.error(err.stack);
  process.exit(1);
});
