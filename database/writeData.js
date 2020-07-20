const fs = require('fs');

const rooms = [];
const users = [];
const reviews = [];

const numberOfRooms = 15e5; // 1.5 mil
const numberOfUsers = 7e4; // 70k
const maxReviewsPerRoom = 17;
const numberOfReviews = numberOfRooms * (maxReviewsPerRoom - 5); // 18 mil

const getRandNum = max => Math.floor( Math.random() * max );
const getRandScore = () => getRandNum(6); // gets 0 to 5

/* USERS --------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const usernames = [
  'Michael', 'Jay', 'Johann', 'Eleen', 'Ben', 'Jen', 'Kyle',
  'Barry', 'Clark', 'Bruce', 'Diana', 'Jonn', 'Wally', 'Arthur'
];
const getUsername = () => usernames[getRandNum(usernames.length)];

const urls = [];
const numPhotos = 8; // number of photos I have in S3
for (let i = 1; i <= numPhotos; i++)
  urls.push(`https://sdc-reviews-styels.s3-us-west-1.amazonaws.com/${i}.jpeg`);

const getImg = () => urls[getRandNum(urls.length)];

const writeUsers = fs.createWriteStream('./database/csv/users.csv');
writeUsers.write( // actual db columns will be alphabetized but doesn't matter
  'id,username,img_url\n',
  'utf8'
);

const generateUsers = (writer, encoding, callback) => {
  const uniqueEntries = 1000;
  for (let i = 0; i < uniqueEntries; i++) {
    users.push([
      getUsername(),
      getImg()
    ]);
  }

  let i = numberOfUsers;
  let j = uniqueEntries - 1; // handles the 1k unique entries
  let id = 0;
  const oneTenth = numberOfUsers / 10;
  let count = 0; // count & oneTenth are just for logging progress

  const write = () => {
    let ok = true;
    do {
      j > 0 ? j-- : j = uniqueEntries - 1; // keep repeating from users arr
      const data = `${id},` + users[j].join(',') + '\n';

      i--;
      id++;
      count++;
      if (count === oneTenth) {
        console.log(`${id / numberOfUsers * 100}% users`);
        count = 0;
      }

      if (i === 0) writer.write(data, encoding, callback);
      else ok = writer.write(data, encoding);
    } while (i > 0 && ok);

    if (i > 0) writer.once('drain', write);
  };
  write();
};

generateUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
  console.log('done generating users');
});

/* REVIEWS ------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const getDate = () => `20${getRandNum(2)}${getRandNum(10)}`
  + `-0${getRandNum(10) || 1}-${getRandNum(3)}${getRandNum(9) || 1}`;

const text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';
const splitText = text.split(' ');

const getText = () => splitText.slice( 0, getRandNum(splitText.length) + 1 ).join(' ');

const writeReviews = fs.createWriteStream('./database/csv/reviews.csv');
writeReviews.write( // actual db columns will be alphabetized but doesn't matter
  'room_id,date,accuracy,body,check_in,cleanliness,communication,id,location,score,user_id,value\n',
  'utf8'
);

const generateReviews = (writer, encoding, callback) => {
  const uniqueEntries = 1000;
  for (let i = 0; i < uniqueEntries; i++) {
    reviews.push({
      room_id: getRandNum(numberOfRooms),
      date: getDate(),
      accuracy: getRandScore(),
      body: `"${getText()}"`,
      check_in: getRandScore(),
      cleanliness: getRandScore(),
      communication: getRandScore(),
      location: getRandScore(),
      score: getRandScore(),
      user_id: getRandNum(numberOfUsers),
      value: getRandScore()
    });
  }

  let i = numberOfReviews;
  let j = uniqueEntries - 1; // handles the 1k unique entries
  let id = 0;
  const oneTwentieth = numberOfReviews / 20;
  let count = 0; // count & oneTwentieth are just for logging progress

  const write = () => {
    let ok = true;
    do {
      j > 0 ? j-- : j = uniqueEntries - 1; // keep repeating from reviews arr
      const r = reviews[j];
      const room_id = getRandNum(numberOfRooms);
      const user_id = getRandNum(numberOfUsers);
      const data = `${room_id},${r.date},${r.accuracy},${r.body},${r.check_in},${r.cleanliness},`
        + `${r.communication},${id},${r.location},${r.score},${user_id},${r.value}\n`;

      i--;
      id++;
      count++;
      if (count === oneTwentieth) {
        console.log(`${id / numberOfReviews * 100}% reviews`);
        count = 0;
      }

      if (i === 0) writer.write(data, encoding, callback);
      else ok = writer.write(data, encoding);
    } while (i > 0 && ok);

    if (i > 0) writer.once('drain', write);
  };
  write();
};

generateReviews(writeReviews, 'utf-8', () => {
  writeReviews.end();
  console.log('done generating reviews');
});

const writeReviews2 = fs.createWriteStream('./database/csv/reviews2.csv');
writeReviews2.write( // actual db columns will be alphabetized but doesn't matter
  'user_id,date,accuracy,body,check_in,cleanliness,communication,id,location,room_id,score,value\n',
  'utf8'
);

const generateReviews2 = (writer, encoding, callback) => {
  const uniqueEntries = 1000;
  let i = numberOfReviews;
  let j = uniqueEntries - 1; // handles the 1k unique entries
  let id = 0;
  const oneTwentieth = numberOfReviews / 20;
  let count = 0; // count & oneTwentieth are just for logging progress

  const write = () => {
    let ok = true;
    do {
      j > 0 ? j-- : j = uniqueEntries - 1; // keep repeating from reviews arr
      const r = reviews[j];
      const user_id = getRandNum(numberOfUsers);
      const room_id = getRandNum(numberOfRooms);
      const data = `${user_id},${r.date},${r.accuracy},${r.body},${r.check_in},${r.cleanliness},`
        + `${r.communication},${id},${r.location},${room_id},${r.score},${r.value}\n`;

      i--;
      id++;
      count++;
      if (count === oneTwentieth) {
        console.log(`${id / numberOfReviews * 100}% reviews2`);
        count = 0;
      }

      if (i === 0) writer.write(data, encoding, callback);
      else ok = writer.write(data, encoding);
    } while (i > 0 && ok);

    if (i > 0) writer.once('drain', write);
  };
  write();
};

generateReviews2(writeReviews2, 'utf-8', () => {
  writeReviews2.end();
  console.log('done generating reviews2');
});

/* ROOMS --------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const writeRooms = fs.createWriteStream('./database/csv/rooms.csv');
writeRooms.write( // actual db columns will be alphabetized but doesn't matter
  'id,score,cleanliness,communication,check_in,accuracy,location,value\n',
  'utf8'
);

const generateRooms = (writer, encoding, callback) => {
  const uniqueEntries = 1000; // only need 1k unique entries
  for (let i = 0; i < uniqueEntries; i++) {
    rooms.push([
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
  const oneTenth = numberOfRooms / 10;
  let count = 0; // count & oneTenth are just for logging progress

  const write = () => {
    let ok = true;
    do {
      j > 0 ? j-- : j = uniqueEntries - 1; // keep repeating from rooms arr
      const data = `${id},` + rooms[j].join(',') + '\n';

      i--;
      id++;
      count++;
      if (count === oneTenth) {
        console.log(`${id / numberOfRooms * 100}% rooms`);
        count = 0;
      }

      if (i === 0) writer.write(data, encoding, callback);
      else ok = writer.write(data, encoding);
    } while (i > 0 && ok);

    if (i > 0) writer.once('drain', write);
  };
  write();
};

generateRooms(writeRooms, 'utf-8', () => {
  writeRooms.end();
  console.log('done generating rooms');
});

// old stuff ---------------------------------------------------------------------------

// const generateReviews = () => {
//   const writer = csvWriter();
//   writer.pipe( fs.createWriteStream('./database/csv/reviews.csv') );

//   for (let i = 0; i < numberOfReviews; i++) {
//     const review = {
//       room_id: getRandNum(numberOfRooms),
//       date: getDate(),
//       accuracy: getRandScore(),
//       body: getText(),
//       check_in: getRandScore(),
//       cleanliness: getRandScore(),
//       communication: getRandScore(),
//       id: i,
//       location: getRandScore(),
//       score: getRandScore(),
//       user_id: getRandNum(numberOfUsers),
//       value: getRandScore()
//     };
//     reviews.push(review);
//     writer.write(review);
//   }
//   writer.end();
//   console.log('done generating reviews');
// };

// const generateReviews2 = () => {
//   const writer = csvWriter();
//   writer.pipe( fs.createWriteStream('./database/csv/reviews2.csv') );

//   for (let i = 0; i < numberOfReviews; i++) {
//     const review = reviews[i];
//     writer.write({
//       user_id: review.user_id,
//       date: review.date,
//       accuracy: review.accuracy,
//       body: review.body,
//       check_in: review.check_in,
//       cleanliness: review.cleanliness,
//       communication: review.communication,
//       id: review.id,
//       location: review.location,
//       room_id: review.room_id,
//       score: review.score,
//       value: review.value
//     });
//   }
//   writer.end();
//   console.log('done generating reviews2');
// };

// const generateUsers = () => {
//   const writer = csvWriter();
//   writer.pipe( fs.createWriteStream('./database/csv/users.csv') );

//   for (let i = 0; i < numberOfUsers; i++) {
//     const user = {
//       id: i,
//       username: getUsername(),
//       img_url: getImg()
//     };
//     users.push(user);
//     writer.write(user);
//   }
//   writer.end();
//   console.log('done generating users');
// };

// really old generateRooms -------------------------------------------------------------

// const oneFifth = numberOfRooms / 5; // 5 rounds to get to 10 mil -> 5 CSV files

// const generateRooms = () => {
//   const unique = 1000; // only need 1k unique entries
//   const uniqueEntries = [];
//   for (let i = 0; i < unique; i++) {
//     uniqueEntries.push({
//       score: getRandScore(),
//       cleanliness: getRandScore(),
//       communication: getRandScore(),
//       check_in: getRandScore(),
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
