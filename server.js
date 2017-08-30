// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// import your the BOOK model so you can use it here
const db = require('./models')




////////////////////
//  DATA
///////////////////

// var books = [
//   {
//     _id: 15,
//     title: "The Four Hour Workweek",
//     author: "Tim Ferriss",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
//     release_date: "April 1, 2007"
//   },
//   {
//     _id: 16,
//     title: "Of Mice and Men",
//     author: "John Steinbeck",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
//     release_date: "Unknown 1937"
//   },
//   {
//     _id: 17,
//     title: "Romeo and Juliet",
//     author: "William Shakespeare",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
//     release_date: "Unknown 1597"
//   }
// ];


var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // console.log(req)
  // send all books as JSON response
  db.Book.find( (err, books) => {
    if (err) {
      console.log('Index error: ' + err);
      res.sendStatus(500);
    }
    // console.log(books)
    res.json(books);
  });
});


// find one book by its ID
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);
  db.Book.findOne({_id: req.params.id}, (err, book) => {
    res.json(book);
  });
});
//https://stackoverflow.com/questions/20629127/mongoose-findone-embedded-document-by-id



// create new book and save a book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  const newBook = new db.Book(req.body);

  newBook.save((err, myNewBoook) => {
    if (err) {
      console.log('HERE is ther ERR, ', err);
    }
    console.log('it worked created ', myNewBoook);
    res.json(myNewBoook);
  });
});




// update book
// app.put('/api/books/:id', function(req,res){
// // get book id from url params (`req.params`)
//   console.log('books update', req.params);
//   var bookId = req.params.id;
//   // find the index of the book we want to remove
//   var updateBookIndex = books.findIndex(function(element, index) {
//     return (element._id === parseInt(req.params.id)); //params are strings
//   });
//   console.log('updating book with index', deleteBookIndex);
//   var bookToUpdate = books[deleteBookIndex];
//   books.splice(updateBookIndex, 1, req.params);
//   res.json(req.params);
// });



// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  
  var bookId = req.params.id;
  // find the index of the book we want to remove
  var deleteBookIndex = books.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id)); //params are strings
  });
  console.log('deleting book with index', deleteBookIndex);
  var bookToDelete = books[deleteBookIndex];
  books.splice(deleteBookIndex, 1);
  res.json(bookToDelete);
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
