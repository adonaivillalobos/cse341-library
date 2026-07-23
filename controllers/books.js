const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const getAllBooks = async (req, res) => {
  try {
    const db = getDB();
    const books = await db.collection('books').find({}).toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

const getBookById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    const db = getDB();
    const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, isbn, genre, publishedYear, publisher, description, totalCopies, availableCopies, location, language, pages } = req.body;
    if (!title || !author || !isbn || !genre || !publishedYear || !publisher || !description || !totalCopies || !language || !pages) {
      return res.status(400).json({ error: 'Required fields: title, author, isbn, genre, publishedYear, publisher, description, totalCopies, language, pages' });
    }
    const db = getDB();
    const book = { title, author, isbn, genre, publishedYear, publisher, description, totalCopies, availableCopies: availableCopies || totalCopies, location, language, pages };
    const result = await db.collection('books').insertOne(book);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    const { title, author, isbn, genre, publishedYear, publisher, description, totalCopies, availableCopies, location, language, pages } = req.body;
    if (!title || !author || !isbn || !genre || !publishedYear || !publisher || !description || !totalCopies || !language || !pages) {
      return res.status(400).json({ error: 'Required fields: title, author, isbn, genre, publishedYear, publisher, description, totalCopies, language, pages' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const book = { title, author, isbn, genre, publishedYear, publisher, description, totalCopies, availableCopies, location, language, pages };
    const result = await db.collection('books').replaceOne({ _id: id }, book);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('books').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };