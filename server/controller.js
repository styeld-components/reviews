const Review = require('../database/reviews.js');

// GET REVIEW DATA
const reviewsMain = function (req, res) {
  const room = req.params.roomId;
  Review.find({ _roomId: room }).sort({ date: -1 }).exec((err, data) => {
    if (err) res.sendStatus(400);
    res.send(data);
  });
};

// GET ALL REVIEW DATA FOR MODAL
const reviewsAll = function (req, res) {
  const room = req.params.roomId;
  Review.find({ _roomId: room }).sort({ date: -1 }).exec((err, data) => {
    if (err) res.sendStatus(400);
    res.send(data);
  });
};

// COMBINE REVIEW SCORES BASED ON ROOM ID
const reviewScores = function (req, res) {
  const room = req.params.roomId;
  const query = [
    {
      $match: {
        _roomId: Number(room)
      }
    },
    {
      $group: {
        _id: '$_roomId',
        total_cleanliness: { $avg: '$scores.cleanliness' },
        total_communication: { $avg: '$scores.communication' },
        total_check_in: { $avg: '$scores.check_in' },
        total_accuracy: { $avg: '$scores.accuracy' },
        total_location: { $avg: '$scores.location' },
        total_value: { $avg: '$scores.value' },
        total_reviews: { $sum: 1 }
      }
    }
  ];

  Review.aggregate(query)
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

// GET OVERALL RATING BASED ON AGGREGATE ROOM SCORES
const reviewOverall = function (req, res) {
  const room = req.params.roomId;
  const query = [
    {
      $match: {
        _roomId: Number(room)
      }
    },
    {
      $group: {
        _id: '$_roomId',
        total_cleanliness: { $avg: '$scores.cleanliness' },
        total_communication: { $avg: '$scores.communication' },
        total_check_in: { $avg: '$scores.check_in' },
        total_accuracy: { $avg: '$scores.accuracy' },
        total_location: { $avg: '$scores.location' },
        total_value: { $avg: '$scores.value' },
        total_reviews: { $sum: 1 }
      }
    },
    {
      $project: {
        total_reviews: '$total_reviews',
        total_score: {
          $avg: [
            '$total_cleanliness',
            '$total_communication',
            'total_check_in',
            'total_accuracy',
            'total_location',
            'total_value'
          ]
        }
      }
    }
  ];

  Review.aggregate(query)
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

module.exports = { reviewsMain, reviewScores, reviewOverall };
