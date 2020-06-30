import axios from 'axios';

const getReviews = function (callback) {
  axios({
    method: 'GET',
    url: 'reviews/main'
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewScores = function (callback) {
  axios({
    method: 'GET',
    url: 'reviews/scores'
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewOverall = function (callback) {
  axios({
    method: 'GET',
    url: 'reviews/overall'
  }).then((res) => {
    callback(res.data);
  });
};

const getAllReviews = function (pageNumber, callback) {
  axios({
    method: 'GET',
    url: `reviews/all?page=${pageNumber}&limit=10`
  }).then((res) => {
    callback(res.data);
  });
};

export default {
  getReviews,
  getReviewScores,
  getReviewOverall,
  getAllReviews
};
