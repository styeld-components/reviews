const Review = require('../database/reviews.js');

const reviews = function (req, res) {
  const room = req.params.roomId;
  Review.find({ _roomId: room }).sort({ date: -1 }).exec((err, data) => {
    if (err) res.sendStatus(400);
    res.send(data);
  });
};

const reviewScores = function (req, res) {
  const room = req.params.roomId;
  Review.aggregate([
    {
      $match: {
        $expr: {_roomId: room }
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
        total_amenities: { $avg: '$scores.amenities' },
        total_reviews: {$sum: 1}
      }
    }
  ])
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

const reviewOverall = function (req, res) {
  const room = req.params.roomId;
  Review.aggregate([
    {
      $match: {
        $expr: {_roomId: room }
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
        total_amenities: { $avg: '$scores.amenities' },
        total_reviews: {$sum: 1}
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
            'total_value',
            'total_amenities'
          ]
        }
      }
    }
  ])
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

module.exports = { reviews, reviewScores, reviewOverall };
