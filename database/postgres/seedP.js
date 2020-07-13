const fs = require('fs');
const csvWriter = require('csv-write-stream');

// break your 10M entries into 4-5 csv files
const numberOfRooms = 5000; // need 10 mil total, 1k unique
const numberOfUsers = 1000;
const numberOfReviews = 1000;

/* ROOMS --------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const getRandNum = max => Math.floor( Math.random() * (max + 1) );
const getRandScore = () => getRandNum(5);

const oneFifth = numberOfRooms / 5; // 5 rounds to get to 10 mil -> 5 CSV files

const generateRooms = () => {
  const unique = 1000; // only need 1k unique entries
  const uniqueEntries = [];
  for (let i = 0; i < unique; i++) {
    uniqueEntries.push({
      reviews: getRandNum(30),
      score: getRandScore(),
      cleanliness: getRandScore(),
      communication: getRandScore(),
      checkIn: getRandScore(),
      accuracy: getRandScore(),
      location: getRandScore(),
      value: getRandScore()
    });
  }

  // outer loop just splits data to 5 CSV files, inner 2 loops b/c only need 1k unique
  for (let k = 0, id = 0; k < numberOfRooms / oneFifth; k++) {
    const writer = csvWriter();
    writer.pipe( fs.createWriteStream(`./database/postgres/csv/rooms${k}.csv`) );

    for (let i = 0; i < oneFifth / unique; i++) {
      for (let j = 0; j < unique; j++, id++) {
        uniqueEntries[j].id = id;
        // uniqueEntries[j].k = k;
        writer.write( uniqueEntries[j] );
      }
    }
    writer.end();
  }
  console.log('done generating rooms');
};

/* USERS --------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const getUsername = () => {
  const usernames = [
    'Michael', 'Jay', 'Johann', 'Eleen',
    'A', 'B', 'C', 'D', 'E', 'F', 'G'
  ];
  const randIdx = getRandNum(usernames.length - 1);
  return usernames[randIdx];
};

const getImg = () => {
  const urls = [];
  const numPhotos = 8; // number of photos I have in S3
  for (let i = 1; i <= numPhotos; i++)
    urls.push(`https://sdc-reviews-styels.s3-us-west-1.amazonaws.com/${i}.jpeg`);
  const randIdx = getRandNum(urls.length - 1);
  return urls[randIdx];
};

const generateUsers = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/postgres/csv/users.csv') );

  for (let i = 0; i < numberOfUsers; i++) {
    writer.write({
      id: i,
      username: getUsername(),
      imgUrl: getImg()
    });
  }
  writer.end();
  console.log('done generating users');
};

/* REVIEWS ------------------------------------------------------------------------
*
*
*
* ------------------------------------------------------------------------------- */

const getDate = () => {
  const dates = [ 'test1', 'test2', 'test3' ];
  const randIdx = getRandNum(dates.length - 1);
  return dates[randIdx];
};

const getText = () => {
  const text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';
  const arr = text.split(' ');
  const randIdx = getRandNum(arr.length);
  return arr.slice(0, randIdx).join(' ');
};

const generateReviews = () => {
  const writer = csvWriter();
  writer.pipe( fs.createWriteStream('./database/postgres/csv/reviews.csv') );

  for (let i = 0; i < numberOfReviews; i++) {
    writer.write({
      id: i,
      roomId: getRandNum(numberOfRooms),
      userId: getRandNum(numberOfUsers),
      date: getDate(),
      body: getText(),
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

generateRooms();
generateUsers();
generateReviews();

// `node --max-old-space-size=` can crash your computer if you allocate too much.
// if using node write streams you can check if your write method returns false,
// run drain event, then restart your func as a callback once mem drain is done

// https://medium.com/@danielburnsart/writing-a-large-amount-of-data-to-a-csv-file-using-nodes-drain-event-99dcaded99b5
// function writeTenMillionUsers(writer, encoding, callback) {
//   let i = 10000000;
//   let id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id++;
//       const username = faker.internet.userName();
//       const avatar = faker.image.avatar();
//       const data = `${id},${username},${avatar}\n`;
//       if (i === 0) {
//         writer.write(data, encoding, callback);
//       } else {
//         // see if we should continue, or wait
//         // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//     // had to stop early!
//     // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
//   write();
// }
