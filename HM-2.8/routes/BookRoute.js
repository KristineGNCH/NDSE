const express = require('express');
const router = express.Router();
const book = require('../models/book');

const fileMulter = require('../middleware/file');
const Book = require('../Book/book');
const library = require('../middleware/library');

// Получаем массив всех книг
router.get('/', async (req, res) => {
    const { books } = library;

    try {
        await Book.find().select('-__v');
        res.json(books);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Получить книгу по id || Получаем объект книги, если запись не найдена, вернём Code: 404
router.get('/:id', async (req, res) => {
    const { books } = library;
    const { id } = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (error) {
        if (book !== -1) {
            res.json(books[book])
        } else {
            res.status(404).json('404 | Книга не найдена')
        }
    }


})

//Скачать книгу по id
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


//Добавить книгу по id || Создаём книгу и возвращаем её же вместе с присвоенным ID
router.post('/:id/upload', fileMulter.single('file'), async (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const { path, filename } = req.file;
    const book = await Book.findById(id).select('-__v');
    books[book] = { ...books[book], fileBook: path, fileName: filename };

    try {
        if (!req.file) {
            res.json(null);
            return;
        }
        await book.save();
    } catch (error) {
        res.status(404).json('404 | Ошибка загрузки');
    }
});

// Создать книгу
router.post('/', (req, res) => {
    const { books } = library
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)
    res.status(201)
    res.json(newBook)
})

// Редактировать книгу по id || Редактируем объект книги, если запись не найдена, вернём Code: 404
router.put('/:id', async (req, res) => {
    const { books } = library;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const { id } = req.params;


    try {
        await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook });
        res.json(books[book]);
    } catch (error) {
        res.status(404).json('404 | Cтраница не найдена');
    }
})


// Удалить книгу по id || Удаляем книгу и возвращаем ответ: 'ok'
router.delete('/:id', async (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const book = books.findIndex(book => book.id === id);

    try {
        await Book.deleteOne({ _id: id });
        res.status(200).send('ok');
    } catch (error) {
        res.status(404).json('404 | Cтраница не найдена');
    };
});

module.exports = router; 