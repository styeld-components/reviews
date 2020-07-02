const mongoose = require('mongoose');

const mongoDB = 'mongodb://database/airbnb';
mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = db;
