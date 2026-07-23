const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('library');
  console.log('Connected to MongoDB');
};

const getDB = () => db;

module.exports = { connectDB, getDB };