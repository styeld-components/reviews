import axios from 'axios';

const getReviews = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/reviews/${roomId}/main`
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewScores = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/reviews/${roomId}/scores`
  }).then((res) => {
    callback(res.data);
  });
};

const getReviewOverall = function (roomId, callback) {
  axios({
    method: 'GET',
    url: `/reviews/${roomId}/overall`
  }).then((res) => {
    callback(res.data);
  });
};

const getAllReviews = function (roomId, pageNumber, callback) {
  axios({
    method: 'GET',
    url: `/reviews/${roomId}/all?page=${pageNumber}&limit=10`
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
