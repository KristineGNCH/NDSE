#!/usr/bin/env node

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const defaultCity = require('./config.js');
const rl = readline.createInterface({ input, output });

const http = require('http');
const myAPIKey = process.env.myAPIKey;

rl.question('Please, specify the requested location: ', city => {
    if (!city) {
        city = defaultCity.city;
    } url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`
    http.get(url, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
            console.log(`Status code: ${statusCode}`);
            res.resume;
            return;
        }

        res.setEncoding('utf8')
        let rowDate = '';
        res.on('data', (chunk) => rowDate += chunk)
        res.on('end', () => {
            let parseData = JSON.parse(rowData);
            console.log(parseData);
        })
    }).on('error', (err) => {
        console.error(err)
    })
    rl.close();
})
