const fs = require('fs');
const writer = require('csv-write-stream')();
const faker = require('faker');

const getRandomNum = max => Math.floor( Math.random() * max );
const getRandomScore = () => getRandomNum(5);

const generateRoomsData = () => {
  writer.pipe( fs.createWriteStream('./database/data.csv') );
  for (let i = 0; i < 100; i++) {
    writer.write({
      reviews: getRandomNum(10),
      score: getRandomScore(),
      cleanliness: getRandomScore(),
      communication: getRandomScore(),
      checkIn: getRandomScore(),
      accuracy: getRandomScore(),
      location: getRandomScore(),
      value: getRandomScore()
    });
  }
  writer.end();
  console.log('done generating data');
};
generateRoomsData();
