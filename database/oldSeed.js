const faker = require('faker');
const db = require('./index.js');
const Review = require('./reviews.js');

const createSampleReviews = function () {
  let reviews = [];

  for (let i = 0; i < 10000; i++) { // EDIT NUMBER OF ENTRIES HERE
    reviews.push({
      id: i,
      _roomId: faker.random.number({ min: 1, max: 100 }),
      user_name: faker.name.firstName(),
      user_image: faker.image.avatar(),
      user_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      date: faker.date.between('2017-01-01', '2020-06-15'),
      text: faker.hacker.phrase(),
      scores: {
        cleanliness: faker.random.number({ min: 1, max: 5 }),
        communication: faker.random.number({ min: 1, max: 5 }),
        check_in: faker.random.number({ min: 1, max: 5 }),
        accuracy: faker.random.number({ min: 1, max: 5 }),
        location: faker.random.number({ min: 1, max: 5 }),
        value: faker.random.number({ min: 1, max: 5 })
      }
    });
  }
  return reviews;
};

const seedData = createSampleReviews();

const insertSampleReviews = (function () {
  Review.create(seedData)
    .then(() => console.log('db seeded'))
    .catch((err) => console.log(err, 'db FAILED to seed'));
});

insertSampleReviews();
