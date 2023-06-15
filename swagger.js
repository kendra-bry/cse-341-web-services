const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'My API',
    description: 'CSE 341 API',
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Contact: {
      $firstName: 'Mickey',
      $lastName: 'Mouse',
      $email: 'example@test.com',
      $favoriteColor: 'red',
      $birthday: '1950-08-04',
    },
  },
};

if (process.env.NODE_ENV === 'PROD') {
  doc.host = process.env.HOST;
  doc.schemes = ['https'];
}

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
