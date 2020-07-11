const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');

const numberOfRooms = 100;
const numberOfUsers = 100;
const numberOfReviews = 1000;

// ROOMS ---------------------------------------------------------

const getRandNum = max => Math.floor( Math.random() * (max + 1) );
const getRandScore = () => getRandNum(5);

const generateRooms = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/seed/rooms.csv') );

  for (let i = 0; i < numberOfRooms; i++) {
    writer.write({
      reviews: getRandNum(10),
      score: getRandScore(),
      cleanliness: getRandScore(),
      communication: getRandScore(),
      checkIn: getRandScore(),
      accuracy: getRandScore(),
      location: getRandScore(),
      value: getRandScore()
    });
  }
  writer.end();
  console.log('done generating rooms');
};
generateRooms();

// USERS ---------------------------------------------------------

const getUsername = () => {
  const usernames = [
    'Michael', 'Jay', 'Johann', 'Eleen', 'Adrian',
    'Nathan', 'Eliza', 'Josef', 'Emily', 'Watson'
  ];
  const randIdx = getRandNum(usernames.length - 1);
  return usernames[randIdx];
};

const getImg = () => {
  const urls = [];
  for (let i = 0; i < 10; i++) {
    urls.push(`https://randomuser.me/api/portraits/men/${i}.jpg`);
    urls.push(`https://randomuser.me/api/portraits/women/${i}.jpg`);
  }
  const randIdx = getRandNum(urls.length - 1);
  return urls[randIdx];
};

const generateUsers = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/seed/users.csv') );

  for (let i = 0; i < numberOfUsers; i++) {
    writer.write({
      username: getUsername(),
      imgUrl: getImg()
    });
  }
  writer.end();
  console.log('done generating users');
};
generateUsers();

// REVIEWS ---------------------------------------------------------

const getDate = () => {
  const dates = [ 'test1', 'test2', 'test3' ];
  const randIdx = getRandNum(dates.length - 1);
  return dates[randIdx];
};

const getLorem = () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

const generateReviews = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/seed/reviews.csv') );

  for (let i = 0; i < numberOfReviews; i++) {
    writer.write({
      roomId: getRandNum(numberOfRooms),
      userId: getRandNum(numberOfUsers),
      date: getDate(),
      body: getLorem(),
      score: getRandScore(),
      cleanliness: getRandScore(),
      communication: getRandScore(),
      checkIn: getRandScore(),
      accuracy: getRandScore(),
      location: getRandScore(),
      value: getRandScore()
    });
  }
  writer.end();
  console.log('done generating reviews');
};
generateReviews();
