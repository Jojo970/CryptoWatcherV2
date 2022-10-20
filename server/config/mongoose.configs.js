const mongoose = require('mongoose');

const mongoEndpoint = 'mongodb://localhost/';
const db = 'cryptowatcher';

mongoose
    .connect(mongoEndpoint+db)
    .then(() => console.log('Connection to Database Established'))
    .catch((err) => console.log('Error in connecting to database', err));