#!/usr/bin/env node
"use strict";
// $imports
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
//clears out cli every time we call pizza command
//this uses the "chalk" import
clear();
console.log(chalk.red(figlet.textSync('pizza-cli', { horizontalLayout: 'full' })));
//this uses the "program" import  
program
    .version('0.0.1')
    .description("An example CLI for ordering pizza's")
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq', 'Add bbq sauce')
    .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
    .option('-C, --no-cheese', 'You do not want any cheese');
program.parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
