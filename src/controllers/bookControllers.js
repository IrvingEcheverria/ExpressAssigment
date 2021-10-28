// Models
const { Book } = require('../models');

// Fecth all books
const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

// Get book by guid
const getByGuid = (req, res) => {
  const { guid } = req.params;
  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

// Add new book to books
const createBook = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);
  // Save in db
  newBook.save();
  res.send({
    message: 'Book successfully created!!!',
    guid: newBook.getGuid(),
  });
};

// Update an existing book
const updateBook = (req, res) => {
  const { params: { guid }, body } = req;
  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      const { title, author, year } = req.body;
      const strictbody = { title, author, year };

      Object.assign(book, strictbody); // Only update selected fields
      Book.update(books);
      res.send({
        message: 'Book successfully updated!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

// Delete book from books
const deleteBook = (req, res) => {
  const { guid } = req.params;
  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const bookIdx = books.findIndex(ent => ent.guid === guid);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      res.send({
        message: 'Book successfully deleted!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

module.exports = {
  getAll,
  getByGuid,
  createBook,
  updateBook,
  deleteBook,
};
