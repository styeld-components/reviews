// const mongoose = require('mongoose');

// const mongoDB = 'mongodb://172.17.0.2:27017/airbnb';
// mongoose.connect(
//   // 'mongodb://172.17.0.2:27017/airbnb', // for AWS/Docker deployment
//   'mongodb://localhost/airbnb', // for local
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
// );

// const db = mongoose.connection;

// module.exports = db;
const options = require('./config.js');
const { Client } = require('pg');

// const client = new Client({ connectionString: 'postgresql://localhost/sdc' });
const client = new Client(options);

client.connect(err => err ? console.log(err) : console.log('connected'));

module.exports = client;
