const defaultLibrary = require('../library/bookLibrary');
const Book = require('../Book/book');

const library = {
    books: [],
};

defaultLibrary.forEach((book) => {
    library.books.push(new Book(book));
});

module.exports = library;
