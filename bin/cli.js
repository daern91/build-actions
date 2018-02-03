#!/usr/bin/env node

const program = require('commander');
const lib = require('../src');

program
  .version('1.0.0')
  .command('greet [name]')
  .action(name => {
    const greeting = lib.sayHello(name);
    console.log(greeting);
  });

program.parse(process.argv);
