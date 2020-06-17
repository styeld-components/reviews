const db  = require('./index.js');
const Reviews = require('./reviews.js');

const sampleReviews = [
  {
    user_name: 'Adrian Ventura',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 10,
      checkin: 10,
      cleanliness: 10,
      location: 10,
      value: 10,
      date: '2019/10/02',
      body: ''
    }
  },
  {
    user_name: 'Eleen Yeh',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 10,
      checkin: 10,
      cleanliness: 10,
      location: 10,
      value: 10,
      date: '2019-07-17',
      body: ''
    }
  },
  {
    user_name: 'Benny Lee',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 7,
      checkin: 8,
      cleanliness: 8,
      location: 5,
      value: 6,
      date: '2020-02-02',
      body: 'The place was okay.'
    }
  },
  {
    user_name: 'Sejin Park',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 9,
      checkin: 8,
      cleanliness: 9,
      location: 8,
      value: 9,
      date: '2018-09-12',
      body: ''
    }
  },
  {
    user_name: 'Watson Fu',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 6,
      checkin: 5,
      cleanliness: 5,
      location: 5,
      value: 5,
      date: '2017-01-19',
      body: 'YO THIS PLACE IS TRASH. Wouldn\'t recommend anyone staying in this dump.'
    }
  },
  {
    user_name: 'Watson Fu',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 2,
      checkin: 4,
      cleanliness: 4,
      location: 1,
      value: 3,
      date: '2018-08-28',
      body: 'I don\'t know how I ended up back here. It definitely did not look like the same place I stayed in before in the photos.'
    }
  },
  {
    user_name: 'Watson Fu',
    user_photo: '',
    user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    review: {
      accuracy: 1,
      checkin: 2,
      cleanliness: 2,
      location: 1,
      value: 1,
      date: '2019-12-27',
      body: 'I told myself no way would I ever come back here, but it was the only place available this week. And for good reason. Somehow even worse than I remembered.'
    }
  },

];

const insertSampleReviews = function() {
  Reviews.create(sampleReviews)
    .then(() => db.disconnect());
};

insertSampleReviews();