#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
  .option('date', {
    alias: 'd',
    type: 'boolean',
    description: "Get the current date",
  })
  .option('month', {
    alias: 'm',
    type: 'boolean',
    description: "Get the current month",
  })
  .option('year', {
    alias: 'y',
    type: 'boolean',
    description: "Get the current year",
  })

  .command('current', 'get the current date', {}, (argv) => {
    const date = new Date();
    if (argv.year) {
      console.log(`Current year ${date.getFullYear()}`);
    } else if (argv.month) {
      console.log(`Current month ${date.getMonth()}`);
    } else if (argv.date) {
      console.log(`Cuttent date ${date.getDate()}`);
    }
  })
  .command('add', 'get the future date', {}, (argv) => {
    const currentDate = new Date();
    if (argv.year) {
      console.log(currentDate.setFullYear(currentDate.getFullYear() + argv.year)).toISOString();
    } else if (argv.month) {
      console.log(currentDate.setMonth(currentDate.getMonth() + argv.month)).toISOString();
    } else if (argv.date) {
      console.log(currentDate.setDate(currentDate.getDate() + argv.date)).toISOString();
    }
  })
  .command('sub', 'get the previous date', {}, (argv) => {
    const currentDate = new Date();
    if (argv.years) {
      console.log(currentDate.setFullYear(currentDate.getFullYear() - argv.year.toISOString()));
    } else if (argv.month) {
      console.log(currentDate.setMonth(currentDate.getMonth() - argv.month)).toISOString();
    } else if (argv.date) {
      console.log(currentDate.setDate(currentDate.getDate() - argv.date)).toISOString();
    }
  })
  .help()
  .argv;
