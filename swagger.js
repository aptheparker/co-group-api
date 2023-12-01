// const swaggerUi = require('swagger-ui-express');
// const swaggereJsdoc = require('swagger-jsdoc');

// const options = {
//     swaggerDefinition: {
//         info: {
//             title: 'Co-Group API',
//             version: '1.0.0',
//             description: 'CoMit Group API with express',
//         },
//         host: 'localhost:3000',
//         basePath: '/'
//     },
//     apis: ['./routes/*.js', './swagger/*']
// };

// const specs = swaggereJsdoc(options);

// module.exports = {
//     swaggerUi,
//     specs
// };

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);