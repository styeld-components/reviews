const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  name: String,
  photo: String,
  url: String,
  body: String,
  date: Date,
  review: {
    cleanliness: String,
    communication: String,
    check_in: String,
    accuracy: String,
    location: String,
    value: String
  }
});

const reviewSchema = new mongoose.Schema({
  _roomId: Number,
  total_cleanliness: Number,
  total_communication: Number,
  total_check_in: Number,
  total_accuracy: Number,
  total_location: Number,
  total_value: Number,
  reviews:[{
    user_name: String,
    user_image: String,
    user_url: String,
    date: Date,
    text: String,
    scores: {
      cleanliness: Number,
      communication: Number,
      check_in: Number,
      accuracy: Number,
      location: Number,
      value: Number
    }
  }]
});

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
