const express = require('express');
const router = express.Router();
const Book = require('../Book/book');
const library = require('../middleware/library');

router.get('/', (req, res) => {
    const { books } = library;
    res.json(books)
})

module.exports = router;