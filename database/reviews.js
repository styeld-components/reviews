const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  user_name: String,
  user_photo: String,
  user_url: String,
  review: {
    body: String,
    date: Date,
    cleanliness: Number,
    communication: Number,
    check_in: Number,
    accuracy: Number,
    location: Number,
    value: Number
  }
});

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;