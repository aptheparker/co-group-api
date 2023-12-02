const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'co-group API',
    description: 'API documentation for co-group',
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen(outputFile, routes, doc);