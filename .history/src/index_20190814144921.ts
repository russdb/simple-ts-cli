#!/usr/bin/env node

// $imports
const chalk   = require('chalk');
const clear   = require('clear');
const figlet  = require('figlet');
const path    = require('path');
const program = require('commander');

//clears out cli every time we call pizza command
//this uses the "chalk" import
clear();
console.log(
  chalk.red(
    figlet.textSync('pizza-cli', { horizontalLayout: 'full' })
  )
);  

const pc = new program.Command();
console.log(pc)
//this uses the "program" import  
pc
  .version('0.0.1')
  .description("An example CLI for ordering pizza's")
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
  .option('-C, --no-cheese', 'You do not want any cheese')
  .parse(process.argv);


  console.log(pc.version)