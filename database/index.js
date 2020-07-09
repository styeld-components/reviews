const mongoose = require('mongoose');

const mongoDB = 'mongodb://172.17.0.2:27017/airbnb';
mongoose.connect(
  // 'mongodb://172.17.0.2:27017/airbnb', // for AWS/Docker deployment
  'mongodb://localhost/airbnb', // for local
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const db = mongoose.connection;

module.exports = db;
