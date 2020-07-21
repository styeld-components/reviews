const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  id: Number,
  _roomId: Number,
  user_name: String,
  user_image: String,
  user_url: String,
  date: Date,
  body: String,
  scores: {
    cleanliness: Number,
    communication: Number,
    check_in: Number,
    accuracy: Number,
    location: Number,
    value: Number
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
