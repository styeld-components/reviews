const options = require('./config.js');
const { Client } = require('pg');

const client = new Client(options);

client.connect(err => err ? console.log(err) : console.log('connected'));

module.exports = client;
