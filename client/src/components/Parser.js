import $ from 'jquery';

const getReviews = function (roomId, callback) {
  let url = `api/${roomId}/reviews/main`;
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    success: (data) => {
      callback(data);
    }
  });
};

const getAllReviews = function (roomId, callback) {
  let url = `api/${roomId}/reviews/all`;
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    success: (data) => {
      callback(data);
    }
  });
};

const getReviewScores = function (roomId, callback) {
  let url = `api/${roomId}/reviews/scores`;
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    success: (data) => {
      callback(data);
    }
  });
};

const getReviewOverall = function (roomId, callback) {
  let url = `api/${roomId}/reviews/overall`;
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    success: (data) => {
      callback(data);
    }
  });
};

export default { getReviews, getAllReviews, getReviewScores, getReviewOverall };
