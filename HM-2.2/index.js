const express = require("express");
const path = require('path');
const logger = require("./middleware/logger");
const error404 = require("./middleware/err-404");
const booksRouter = require("./routes/books");
const demorRouter = require("./routes/demo");
const app = express();

app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/demo', demorRouter);
app.use(logger);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Library app listening on port ${PORT}`)
})