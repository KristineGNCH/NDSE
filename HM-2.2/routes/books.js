const express = require('express');
const router = express.Router();
const fileMulter = require("../middleware/file");
const Book = require('../Book/book');


const library = {
    books: [
        new Book(
            'Книга 1',
            'Руслан и Людмила',
            'Пушкин, Александр Сергеевич',
        ),
        new Book(
            'Книга 2',
            'Медный всадник',
            'Пушкин, Александр Сергеевич',
        ),
        new Book(
            'Книга 3',
            'Пиковая дама',
            'Пушкин, Александр Сергеевич',
        ),
    ],
};

router.get('/', (req, res) => {
    const { books } = library;
    res.status(200);
    res.json({ books });
});

router.get('/:id/download', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (book && books[book].fileBook) {
        res.download(books[book].fileBook, books[book].fileName)
    } else {
        res.status(404)
        res.json('404 | Книга не найдена')
    }
});

router.get('/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.findIndex(el => el.id === id);

    if (book !== -1) {
        res.status(200);
        res.json(books[book]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.post('/', (req, res) => {
    const { books } = library;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    res.status(200);
    res.json(newBook);
});


router.put('/:id', (req, res) => {
    const { books } = library;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const { id } = req.params;
    const book = books.findIndex(book => book.id === id)

    if (idx !== -1) {
        books[book] = {
            ...books[book],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        }
        res.status(200);
        res.json(books[book]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.delete('/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.findIndex(book => book.id === id);

    if (idx !== -1) {
        books.splice(book, 1);
        res.status(200);
        res.json(true);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});


module.exports = router;