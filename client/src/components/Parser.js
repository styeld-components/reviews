import axios from 'axios';

const getReviews = function (roomId, callback) {
  let url = 'reviews/main';
  axios({
    method: 'GET',
    url: url
  }).then((res) => {
    callback(res.data);
  });
};

const getAllReviews = function (roomId, callback) {
  let url = 'reviews/all';
  axios({
    method: 'GET',
    url: url
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewScores = function (roomId, callback) {
  let url = 'reviews/scores';
  axios({
    method: 'GET',
    url: url
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewOverall = function (roomId, callback) {
  let url = 'reviews/overall';
  axios({
    method: 'GET',
    url: url
  }).then((res) => {
    callback(res.data);
  });
};

export default {
  getReviews,
  getAllReviews,
  getReviewScores,
  getReviewOverall
};
