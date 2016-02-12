/**
 * Created by m on 16-2-5.
 */
/*#!/usr/bin/env node*/


var program = require('commander');

program
    .version('0.0.1')
    .command('select [dir]')
    .description('tt')
    .action(require('./func/Getlist.js'));

program
    .command('login')
    .description('ddenglu')
    .action(require('./func/Login.js'));


console.log('test');

program.parse(process.argv);
