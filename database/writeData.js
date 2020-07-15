const fs = require('fs');
const csvWriter = require('csv-write-stream');

const rooms = [];
const users = [];
const reviews = [];

const numberOfRooms = 1e4; // need 10 mil total, 1k unique
const numberOfUsers = 1000;
const numberOfReviews = 1000;

const getRandNum = max => Math.floor( Math.random() * max );
const getRandScore = () => getRandNum(6); // gets 0 to 5

/* ROOMS --------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const writeRooms = fs.createWriteStream('./database/csv/rooms.csv');
writeRooms.write( // actual db columns will be alphabetized but doesn't matter
  'id,reviews,score,cleanliness,communication,checkIn,accuracy,location,value\n',
  'utf8'
);

const generateRooms = (writer, encoding, callback) => {
  const uniqueEntries = 1000; // only need 1k unique entries
  for (let i = 0; i < uniqueEntries; i++) {
    rooms.push([
      getRandNum(30),
      getRandScore(),
      getRandScore(),
      getRandScore(),
      getRandScore(),
      getRandScore(),
      getRandScore(),
      getRandScore()
    ]);
  }

  let i = numberOfRooms;
  let j = uniqueEntries - 1; // handles the 1k unique entries
  let id = 0;

  const write = () => {
    let ok = true;
    do {
      j ? j-- : j = uniqueEntries - 1; // keep repeating from rooms arr
      const data = `${id},` + rooms[j].join(',') + '\n';

      i--;
      id++;

      if (i === 0) writer.write(data, encoding, callback);
      else ok = writer.write(data, encoding);
    } while (i > 0 && ok);

    if (i > 0) writer.once('drain', write);
  };
  write();
};

/* USERS --------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const getUsername = () => {
  const usernames = [
    'Michael', 'Jay', 'Johann', 'Eleen', 'Ben', 'Kyle', 'Barry',
    'Clark', 'Bruce', 'Dianna', 'Jonn', 'Wally', 'Arthur'
  ];
  const randIdx = getRandNum(usernames.length);
  return usernames[randIdx];
};

const getImg = () => {
  const urls = [];
  const numPhotos = 8; // number of photos I have in S3
  for (let i = 1; i <= numPhotos; i++)
    urls.push(`https://sdc-reviews-styels.s3-us-west-1.amazonaws.com/${i}.jpeg`);
  const randIdx = getRandNum(urls.length);
  return urls[randIdx];
};

const generateUsers = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/csv/users.csv') );

  for (let i = 0; i < numberOfUsers; i++) {
    const user = {
      id: i,
      username: getUsername(),
      imgUrl: getImg()
    };
    users.push(user);
    writer.write(user);
  }
  writer.end();
  console.log('done generating users');
};

/* REVIEWS ------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const getDate = () => `20${getRandNum(2)}${getRandNum(10)}`
  + `-0${getRandNum(10) || 1}-${getRandNum(3)}${getRandNum(9) || 1}`;

const getText = () => {
  const text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';
  const arr = text.split(' ');
  const randIdx = getRandNum(arr.length) + 1;
  return arr.slice(0, randIdx).join(' ');
};

const generateReviews = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/csv/reviews.csv') );

  for (let i = 0; i < numberOfReviews; i++) {
    writer.write({
      roomId: getRandNum(numberOfRooms),
      id: i,
      accuracy: getRandScore(),
      body: getText(),
      checkIn: getRandScore(),
      cleanliness: getRandScore(),
      communication: getRandScore(),
      date: getDate(),
      location: getRandScore(),
      score: getRandScore(),
      userId: getRandNum(numberOfUsers),
      value: getRandScore()
    });
  }
  writer.end();
  console.log('done generating reviews');
};

const generateReviews2 = () => { // cass: reviews_by_user needs diff column order
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/csv/reviews2.csv') );

  for (let i = 0; i < numberOfReviews; i++) {
    writer.write({
      userId: getRandNum(numberOfUsers),
      id: i,
      accuracy: getRandScore(),
      body: getText(),
      checkIn: getRandScore(),
      cleanliness: getRandScore(),
      communication: getRandScore(),
      date: getDate(),
      location: getRandScore(),
      roomId: getRandNum(numberOfRooms),
      score: getRandScore(),
      value: getRandScore()
    });
  }
  writer.end();
  console.log('done generating reviews2');
};

generateRooms(writeRooms, 'utf-8', () => {
  writeRooms.end();
  console.log('done generating rooms');
});
generateUsers();
generateReviews();
generateReviews2();

// old generateRooms -------------------------------------------------------------

// const oneFifth = numberOfRooms / 5; // 5 rounds to get to 10 mil -> 5 CSV files

// const generateRooms = () => {
//   const unique = 1000; // only need 1k unique entries
//   const uniqueEntries = [];
//   for (let i = 0; i < unique; i++) {
//     uniqueEntries.push({
//       reviews: getRandNum(30),
//       score: getRandScore(),
//       cleanliness: getRandScore(),
//       communication: getRandScore(),
//       checkIn: getRandScore(),
//       accuracy: getRandScore(),
//       location: getRandScore(),
//       value: getRandScore()
//     });
//   }

//   // outer loop just splits data to 5 CSV files, inner 2 loops b/c only need 1k unique
//   for (let k = 0, id = 0; k < numberOfRooms / oneFifth; k++) {
//     const writer = csvWriter();
//     writer.pipe( fs.createWriteStream(`./database/csv/rooms${k}.csv`) );

//     for (let i = 0; i < oneFifth / unique; i++) {
//       for (let j = 0; j < unique; j++, id++) {
//         uniqueEntries[j].id = id;
//         uniqueEntries[j].k = k;
//         writer.write( uniqueEntries[j] );
//       }
//     }
//     writer.end();
//   }
//   console.log('done generating rooms');
// };
