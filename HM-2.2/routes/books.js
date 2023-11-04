const express = require('express');
const router = express.Router();
const fileMulter = require("../middleware/file");
const Book = require('../Book/book');
const path = require('path');


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
    res.json({ books });
});

router.get('/:id/download', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (book != -1) {
        res.download(book.fileBook);
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});


router.get('/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.findIndex(el => el.id === id);

    if (book !== -1) {
        res.json(books[book]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.post('/',
    fileMulter.single("fileBook"),
    (req, res) => {
        const { books } = library;
        const { title, description, authors, favorite, fileCover, fileName } = req.body;
        const newBook = new Book(title, description, authors, favorite, fileCover, fileName);

        if (req.file) {
            const { path } = req.file
            res.json({ path })
        }

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


module.exports = router;