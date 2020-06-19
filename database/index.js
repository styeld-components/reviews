const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/airbnb';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = db;
