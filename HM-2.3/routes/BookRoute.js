const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');
const Book = require('../Book/book')

const library = {
    books: [
        new Book()
    ],
};

router.get('/', (req, res) => {
    const { books } = library
    res.json(books)
})

router.get('/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const book = books.findIndex(el => el.id === id)

    if (book !== -1) {
        res.json(books[book])
    } else {
        res.status(404)
        res.json('404 | Cтраница не найдена')
    }
})

router.get('/:id/download', (req, res) => {
    const { books } = library
    const { id } = req.params
    const book = books.find(book => book.id === id)
    if (book && books[book].fileBook) {
        res.download(books[book].fileBook, books[book].fileName)
    } else {
        res.status(404)
        res.json('404 | Книга не найдена')
    }
})

router.post('/:id/upload', fileMulter.single('file'), (req, res) => {
    const { books } = library;
    const { id } = req.params;
    if (!req.file) {
        res.json(null);
        return;
    }

    const { path, filename } = req.file;
    const book = books.find((el) => el.id === id);

    if (book) {
        books[book] = {
            ...books[book],
            fileBook: path,
            fileName: filename
        }
        res.json('Файл загружен')
    } else {
        res.status(404);
        res.json('404 | Ошибка загрузки');
    }
});

router.post('/', (req, res) => {
    const { books } = library
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)
    res.status(201)
    res.json(newBook)
})

router.put('/:id', (req, res) => {
    const { books } = library
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const { id } = req.params
    const book = books.findIndex(book => book.id === id)
    if (book !== -1) {
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
        res.json(books[book])
    } else {
        res.status(404)
        res.json('404 | Cтраница не найдена')
    }
})

router.delete('/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const book = books.findIndex(book => book.id === id)
    if (book !== -1) {
        books.splice(book, 1)
        res.status(200)
        res.send("Ok");
    } else {
        res.status(404)
        res.json('404 | Cтраница не найдена')
    }
})

module.exports = router; 