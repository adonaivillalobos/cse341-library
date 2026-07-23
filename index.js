require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.send('Library Management System API');
});

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

connectDB().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});