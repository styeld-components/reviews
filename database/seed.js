const faker = require('faker');
const db = require('./index.js');
const Reviews = require('./reviews.js');

const sampleReviews = [
  {
    _roomId: Number,
    total_cleanliness: { $avg: '$reviews.scores.cleanliness' },
    total_communication: { $avg: '$reviews.scores.communication' },
    total_check_in: { $avg: '$reviews.scores.check_in' },
    total_accuracy: { $avg: '$reviews.scores.accuracy' },
    total_location: { $avg: '$reviews.scores.location' },
    total_value: { $avg: '$reviews.scores.value' },
    reviews: [
      {
        user_name: faker.name.findName,
        user_image: faker.image.avatar,
        user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        date: faker.date.past,
        text: faker.hacker.phrase,
        scores: {
          cleanliness: faker.random.number({'min': 1, 'max': 10}),
          communication: faker.random.number({'min': 1, 'max': 10}),
          check_in: faker.random.number({'min': 1, 'max': 10}),
          accuracy: faker.random.number({'min': 1, 'max': 10}),
          location: faker.random.number({'min': 1, 'max': 10}),
          value: faker.random.number({'min': 1, 'max': 10})
        }
      }
    ]
  }
];

const insertSampleReviews = function () {
  Reviews.create(sampleReviews)
    .then(() => db.disconnect());
};

insertSampleReviews();
