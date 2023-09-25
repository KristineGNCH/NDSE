#!/usr/bin/env node

const readline = require('node: readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const randomNumber = Math.floor(Math.random() * 100);
console.log(`/n Загадано число в диапазоне от 0 до 100 /n`);

rl.on('line', (input) => {
    if (input < randomNumber) {
        console.log(`/n Больше /n`);
    } else if (input > randomNumber) {
        console.log(`/n Меньше /n`);
    } else {
        console.log(`/n Число отгадано! /n`);
        rl.close();
    }
})
