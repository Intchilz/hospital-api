const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts ApI',
        description: 'Contacts Api'
    },
    host: 'https://hospital-api-1-lij2.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);