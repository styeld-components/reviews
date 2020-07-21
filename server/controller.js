const client = require('../database/index.js');

// GET REVIEW DATA
const reviewsMain = (req, res) => {
  const room = req.params.roomId;
  // const query = `SELECT * FROM reviews WHERE room_id = ${room} ORDER BY date DESC`;
  const query = `SELECT (users.username, users.imgUrl, reviews.id, reviews.date, reviews.body) FROM users INNER JOIN reviews ON users.id = reviews.user_id WHERE reviews.room_id = ${room} ORDER BY reviews.date DESC;`;

  client.query(query)
    .then(data => res.send(data.rows))
    .catch(err => console.log('ERR:', err));
};

// GET ALL REVIEW DATA FOR MODAL
const reviewsAll = (req, res) => {
  const room = req.params.roomId;
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const query = `SELECT (users.username, users.imgUrl, reviews.id, reviews.date, reviews.body) FROM users INNER JOIN reviews ON users.id = reviews.user_id WHERE reviews.room_id = ${room} ORDER BY reviews.date DESC;`;

  client.query(query)
    .then(data => res.send( data.rows.slice(startIndex, endIndex) ))
    .catch(err => console.log('ERR:', err));
};

// // COMBINE REVIEW SCORES BASED ON ROOM ID
const reviewScores = function (req, res) {
  const room = req.params.roomId;
  const query = `SELECT ( AVG(cleanliness), AVG(communication), AVG(check_in), AVG(accuracy), AVG(location), AVG(value) ) FROM reviews WHERE room_id = ${room};`;

  client.query(query)
    .then(data => res.send( data.rows[0].row.split(',') ))
    .catch(err => console.log('ERR:', err));
};

// // GET OVERALL RATING BASED ON AGGREGATE ROOM SCORES
const reviewOverall = function (req, res) {
  const room = req.params.roomId;
  const query = `SELECT ( AVG(cleanliness), AVG(communication), AVG(check_in), AVG(accuracy), AVG(location), AVG(value), count(*) ) FROM reviews WHERE room_id = ${room}`;

  client.query(query)
    .then(data => res.send( data.rows[0].row.split(',') ))
    .catch(err => console.log('ERR:', err));
};

/* OLD STUFF **********************************************************
 *
 **********************************************************************
 *
 **********************************************************************
 */

// const reviewsMain = (req, res) => {
  // Review.find({ _roomId: room }).sort({ date: -1 })
  //   .exec((err, data) => {
  //     if (err) res.sendStatus(400);
  //     res.send(data.slice(0, 6));
  //   });
// };

// GET ALL REVIEW DATA FOR MODAL
// const reviewsAll = function (req, res) {
//   const room = req.params.roomId;
//   const limit = Number(req.query.limit);
//   const page = Number(req.query.page);

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   Review.find({ _roomId: room }).sort({ date: -1 })
//     .exec((err, data) => {
//       if (err) res.sendStatus(400);
//       res.send(data.slice(startIndex, endIndex));
//     });
// };

// // COMBINE REVIEW SCORES BASED ON ROOM ID
// const reviewScores = function (req, res) {
//   const room = req.params.roomId;
//   const query = [
//     {
//       $match: {
//         _roomId: Number(room)
//       }
//     },
//     {
//       $group: {
//         _id: '$_roomId',
//         total_cleanliness: { $avg: '$scores.cleanliness' },
//         total_communication: { $avg: '$scores.communication' },
//         total_check_in: { $avg: '$scores.check_in' },
//         total_accuracy: { $avg: '$scores.accuracy' },
//         total_location: { $avg: '$scores.location' },
//         total_value: { $avg: '$scores.value' },
//         total_reviews: { $sum: 1 }
//       }
//     }
//   ];

//   Review.aggregate(query)
//     .exec((err, data) => {
//       if (err) res.sendStatus(400);
//       res.send(data);
//     });
// };

// // GET OVERALL RATING BASED ON AGGREGATE ROOM SCORES
// const reviewOverall = function (req, res) {
//   const room = req.params.roomId;
//   const query = [
//     {
//       $match: {
//         _roomId: Number(room)
//       }
//     },
//     {
//       $group: {
//         _id: '$_roomId',
//         total_cleanliness: { $avg: '$scores.cleanliness' },
//         total_communication: { $avg: '$scores.communication' },
//         total_check_in: { $avg: '$scores.check_in' },
//         total_accuracy: { $avg: '$scores.accuracy' },
//         total_location: { $avg: '$scores.location' },
//         total_value: { $avg: '$scores.value' },
//         total_reviews: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         total_reviews: '$total_reviews',
//         total_score: {
//           $avg: [
//             '$total_cleanliness',
//             '$total_communication',
//             'total_check_in',
//             'total_accuracy',
//             'total_location',
//             'total_value'
//           ]
//         }
//       }
//     }
//   ];

//   Review.aggregate(query)
//     .exec((err, data) => {
//       if (err) res.sendStatus(400);
//       res.send(data);
//     });
// };

module.exports = {
  reviewsMain,
  reviewsAll,
  reviewScores,
  reviewOverall
};
