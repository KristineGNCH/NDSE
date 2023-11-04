const express = require("express");
const path = require('path');
const logger = require("./middleware/logger");
const error404 = require("./middleware/err-404");
const booksRouter = require("./routes/books");
const app = express();
const path = require('path');

app.use(express.json());
app.use('/api/books', booksRouter);
app.use(logger);
cb(null, path.join(__dirname, '/public'));
app.use(express.static(__dirname));
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));