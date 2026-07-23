const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library Management System API',
    description: 'API documentation for the Library Management System'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);