#!/usr/bienv node

const fs = require('fs');
const fsPath = require('path');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function startGame(logFile) {
    rl.question('\n Давай сыграем! Выбери число 0 (орёл) или 1 (решка)\n ', (number) => {
        const selectedNum = parseInt(number);
        if (isNaN(selectedNum) || (selectedNum !== 0 && selectedNum !== 1)) {
            console.log(' Вы должны выбрать 0 или 1 ');
            startGame(logFile);
        } else {
            const randomNum = Math.round(Math.random());
            const resultText = (randomNum === selectedNum) ? ' \n Верно \n ' : ' \n Не угадали! \n';
            console.log(`${resultText}`);
            result(resultText, logFile);

            rl.question(`\n Начать сначала? (да/нет) \n`, (playAgain) => {
                if (playAgain.toLowerCase() === 'да' || playAgain.toLowerCase() === 'д') {
                    startGame(logFile);
                } else if (playAgain.toLowerCase() === 'нет' || playAgain.toLowerCase() === 'н') {
                    console.log('До скорой встречи!');
                    rl.close();
                }
            })
        }
    })
}

function result(result, logFile) {
    fs.appendFileSync(logFile, `${result}`);
};

const logFile = fsPath.join(__dirname, 'logFile.txt');
console.log(`Результат Вашей игры будет сохранен в файле ${logFile}`);
fs.writeFileSync(logFile, '');

startGame(logFile);