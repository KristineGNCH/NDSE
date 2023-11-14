const express = require('express');

const error = require('./middleware/error-404');

const indexRouter = require('./routes/index.js');
const router = require('./routes/BookRoute.js');

const app = express();
const logger = require('./middleware/logger.js');

const viewRoute = require('./routes/viewRoute.js');

app.use(express.json());

app.use('/', indexRouter)
app.use('/api/books', router);
app.use('/books', viewRoute);

app.use(logger);
app.use(error);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
})