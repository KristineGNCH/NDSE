const express = require('express');
const Book = require('../Book/book');
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const { getCounter, setCounter } = require('./counter');

const library = {
  books: [
    new Book()
  ],
};

router.get('/view', (_req, res) => {
  res.render('books/index', { title: "Список книг", books: library.books })
})


router.get('/view/:id', (req, res) => {
  const { id } = req.params;
  const book = library.books.findIndex(book => book.id === id);

  if (book !== -1) {
    getCounter(id, (resp) => {
      if (resp.statusCode !== 500) {
        resp.on('data', (d) => {
          const count = JSON.parse(d).count
          console.log(`Запрос прошел успешно, cnt - ${count}`);
          res.render('books/view', {
            title: 'Выбранная книга', book: library.books[book], count: count
          })
        })
        setCounter(id)

      } else {
        res.status(404)
        res.redirect('../views/error/404')
      }
    })
  }
})

router.get('/create', (req, res) => {
  res.render('books/create', { title: 'Добавить книгу', book: {} })
})

router.post('/create', fileMiddleware.single('file'), (req, res) => {
  const { title, authors, description, favorite, fileCover, fileName } = req.body
  const fileBook = req.file ? req.file : null
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)

  library.books.push(newBook)

  res.redirect('/books/view')
})

router.get('/update/:id', (req, res) => {
  const { id } = req.params
  const book = library.books.find(el => el.id === id)

  if (book) {
    res.render('books/update', {
      title: 'Редактировать книгу',
      book: book,
    })
  } else {
    res.status(404).redirect('../views/error/404')
  }
})

router.post('/update/:id', fileMiddleware.single('file'), (req, res) => {
  const { id } = req.params
  const book = library.books.findIndex(el => el.id === id)
  const { title, authors, description, favorite, fileCover, fileName } = req.body
  const fileBook = req.file ? req.file : null
  if (book !== -1) {
    library.books[book] = {
      ...library.books[book],
      title, authors, description, favorite, fileCover, fileName, fileBook
    }
    res.status(200).redirect('/books/view/' + id)
  } else {
    res.status(404).redirect("/404")
  }
})

router.post('/delete/:id', (req, res) => {
  const { id } = req.params
  const book = library.books.findIndex(el => el.id === id)
  if (book !== -1) {
    library.books.splice(book, 1)
    res.status(200).redirect('/books/view/')
  } else {
    res.status(404).redirect("/404")
  }
})

module.exports = router;