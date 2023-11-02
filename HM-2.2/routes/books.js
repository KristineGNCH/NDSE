const express = require('express');
const router = express.Router();
const fileMulter = require("../middleware/file");

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

const library = {
    books: [],
};

router.get('/:id/download', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (book && books[book].fileBook) {
        res.download(books[book].fileBook, books[book].fileName);
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});


router.post('/login', (req, res) => {
    res.status(201);
    res.json(user);
});

router.get('/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.status(201);
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.post('/', fileMulter.single("fileBook"), (req, res) => {
    const { books } = library;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);

    books.push(newBook);
    console.log(fileBook);
    res.status(201);
    res.json(newBook);
});


router.put('/:id', (req, res) => {
    const { books } = library;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

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

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.delete('/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.status(201);
        res.json(true);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.get('/', (req, res) => {
    const { url } = req;
    res.json({ url });
});


module.exports = router;