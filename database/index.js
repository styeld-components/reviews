const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/airbnb';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('useUnifiedTopology', true);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected!')
});

module.exports = db;
