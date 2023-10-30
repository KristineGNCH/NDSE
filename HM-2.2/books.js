const express = require('express');

const logger = require('./middleware/logger');
const fileMulter = require('./middleware/file');
const indexRoutes = require('./routes/index');
const demoRouter = require('./routes/demo');
const error404 = require('./middleware/err-404');

const { v4: uuid } = require('uuid');

class Book {
    constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '') {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

const stor = {
    books: [],
};

const app = express();
app.use(express.json());

app.get('/api/books/:id/download', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const book = books.find(book => book.id === id)
    if (book && books[book].fileBook) {
        res.download(books[book].fileBook, books[book].fileName)
    } else {
        res.status(404)
        res.json('404 | Книга не найдена')
    }
});


app.post('/api/user/login', (req, res) => {
    const { user } = stor
    res.status(201)
    res.json(user)
});

app.get('/api/books', (req, res) => {
    const { books } = stor
    res.json(books)
});

app.get('/api/books/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
});

app.post('/api/books/', (req, res) => {
    const { books } = stor
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(newBook)
    res.status(201)
    res.json(newBook)
});


app.put('/api/books/:id', (req, res) => {
    const { books } = stor
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books.splice(idx, 1)
        res.json(true)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
});


app.use('/public', express.static());

app.use(logger);
app.use('/', indexRoutes);
app.use('/demo', demoRouter);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT)