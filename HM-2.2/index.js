const express = require("express");
const logger = require("./middleware/logger");
const error404 = require("./middleware/err-404");
const booksRouter = require("./routes/books");
const demoRouter = require('./routes/demo');
const app = express();

app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/api/books', booksRouter);
app.use('/demo', demoRouter);
app.use(logger);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));