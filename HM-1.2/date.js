#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

getDate.command({
    command: 'current-date',
    describe: 'Get the current date and time in ISO format',
    handler: function () {
      console.log(new Date().toISOString());
    }
  });

  getDate.command({
    command: 'current-year',
    describe: 'Get the current year',
    handler: function () {
      console.log(new Date().getFullYear());
    }
  });

  getDate.command({
    command: 'current-year',
    describe: 'Get the current month',
    handler: function () {
      console.log(new Date().getMonth() + 1);
    }
  });

  getDate.command({
    command: 'date',
    describe: 'Get the current date in the calendar month',
    handler: function () {
      console.log(new Date().getDate());
    }
  });


