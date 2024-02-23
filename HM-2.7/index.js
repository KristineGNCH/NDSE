const express = require('express');
const mongoose = require('mongoose');

const error = require('./middleware/error-404');

const indexRouter = require('./routes/index.js');
const router = require('./routes/BookRoute.js');

const logger = require('./middleware/logger.js');

const viewRoute = require('./routes/viewRoute.js');

const app = express();
app.use(express.json());

app.use('/', indexRouter)
app.use('/api/books', router);
app.use('/books', viewRoute);

app.use(logger);
app.use(error);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


async function start(PORT, UrlBD) {
    try {
        await mongoose.connect(UrlBD);
        app.listen(PORT);
        console.log(`Server listening on Port ${PORT}`);
    } catch (error) {
        console.log('error', error);
    }
};

const PORT = process.env.PORT || 3000;
const UrlDB = process.env.UrlDB || 'mongodb://root:example@mongo:27017/';

start(PORT, UrlDB);