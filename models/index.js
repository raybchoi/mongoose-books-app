
var mongoose = require("mongoose");

// connects mongooseto a local book-app database URI saying to move it from book.js to index.js
mongoose.connect("mongodb://localhost/book-app");

//  import and export the Book model in index.js
const Book = require('./book');
// const Author = require('./author');

exports.Book = Book;
// exports.Author = Author;

// we did this b/c now if someone were to require('./models') they'd gain access to this book database model.

// OR you can use the following
// module.exports.Book = require("./book.js");

// In the end this means that when you require ./models in server.js you get back an object like { Book: Model, Author: Model }
