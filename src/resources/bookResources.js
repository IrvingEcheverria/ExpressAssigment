// Modules
const express = require('express');
const BookResources = express.Router();

// Controllers
const { BookControllers } = require('../controllers');

// Validator
const { validator } = require('../utils');

// All book resources
BookResources.get('/', BookControllers.getAll);
BookResources.post('/', validator.checkInputs, validator.checkDB, BookControllers.createBook);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', validator.checkInputs, validator.checkDB, BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;
