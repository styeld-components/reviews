const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  _roomId: Number,
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
    value: Number,
    amenities: Number
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
