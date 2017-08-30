// creating the new DB for books

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creating the new Book db schema
const BookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: Date
});

// creation of the Book model that will be exported out

const Book = mongoose.model('Book', BookSchema);

// export Book (the book model) from this module (this file) so it can be used other places

module.exports = Book;
