import axios from 'axios';

// convert data from new SDC back end to work w/ old FEC front end
const convertData = (res, roomId) => {
  const arr = [];
  res.data.forEach(elem => {
    let data = elem.row.split(',');
    const review = {
      id: data[2],
      _roomId: roomId,
      user_name: data[0].slice(1),
      user_image: data[1],
      user_url: '',
      scores: {
        cleanliness: 0,
        communication: 0,
        check_in: 0,
        accuracy: 0,
        location: 0,
        value: 0
      },
      date: data[3]
    };
    data = data.slice(4);
    review.body = data.join(',').slice(1);
    review.body = review.body.slice(0, review.body.length - 2);
    arr.push(review);
  });
  return arr;
};

const getReviews = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/main`
  }).then( res => callback( convertData(res, roomId) ) );
};

const getReviewScores = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/scores`
  }).then((res) => {
    callback({
      total_cleanliness: Number( res.data[0].slice(1) ),
      total_accuracy: Number( res.data[3] ),
      total_communication: Number( res.data[1] ),
      total_location: Number( res.data[4] ),
      total_check_in: Number( res.data[2] ),
      total_value: Number( res.data[5].slice(0, 5) )
    });
  });
};

const getReviewOverall = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/overall`
  }).then((res) => {
    res.data[0] = res.data[0].slice(1);
    res.data[6] = res.data[6].slice(0, res.data[6].length - 1);
    const arr = [];

    res.data.forEach(elem => arr.push( Number(elem) ) );
    const sum = arr.slice(0, 6).reduce( (acc, curr) => acc + curr, 0 );
    callback({
      total_score: sum / 6,
      total_reviews: arr[6]
    });
  });
};

const getAllReviews = (roomId, pageNumber, callback) => {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/all?page=${pageNumber}&limit=10`
  }).then( res => callback( convertData(res, roomId) ) );
};

export default {
  getReviews,
  getReviewScores,
  getReviewOverall,
  getAllReviews
};
