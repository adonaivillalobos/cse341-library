const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const getAllAuthors = async (req, res) => {
  try {
    const db = getDB();
    const authors = await db.collection('authors').find({}).toArray();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve authors' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }
    const db = getDB();
    const author = await db.collection('authors').findOne({ _id: new ObjectId(req.params.id) });
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve author' });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, biography, nationality, birthYear, website, email, awardsWon, booksWritten, isActive } = req.body;
    if (!firstName || !lastName || !biography || !nationality || !birthYear || !email) {
      return res.status(400).json({ error: 'Required fields: firstName, lastName, biography, nationality, birthYear, email' });
    }
    const db = getDB();
    const author = { firstName, lastName, biography, nationality, birthYear, website, email, awardsWon, booksWritten, isActive };
    const result = await db.collection('authors').insertOne(author);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create author' });
  }
};

const updateAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }
    const { firstName, lastName, biography, nationality, birthYear, website, email, awardsWon, booksWritten, isActive } = req.body;
    if (!firstName || !lastName || !biography || !nationality || !birthYear || !email) {
      return res.status(400).json({ error: 'Required fields: firstName, lastName, biography, nationality, birthYear, email' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const author = { firstName, lastName, biography, nationality, birthYear, website, email, awardsWon, booksWritten, isActive };
    const result = await db.collection('authors').replaceOne({ _id: id }, author);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json({ message: 'Author updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update author' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('authors').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };