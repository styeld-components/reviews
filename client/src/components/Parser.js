import axios from 'axios';

const getReviews = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/main`
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewScores = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/scores`
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewOverall = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/overall`
  }).then((res) => {
    callback(res.data);
  });
};

const getAllReviews = (roomId, pageNumber, callback) => {
  axios({
    method: 'GET',
    url: `/${roomId}/reviews/all?page=${pageNumber}&limit=10`
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
