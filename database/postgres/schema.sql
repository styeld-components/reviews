/* to run this file:
  psql postgres
  \i /users/brandon/desktop/hr/sdc/database/postgres/schema.sql
*/

DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\connect sdc;

CREATE TABLE rooms (
  id INT PRIMARY KEY,
  reviews SMALLINT NOT NULL,
  score REAL NOT NULL,
  cleanliness REAL,
  communication REAL,
  checkIn REAL,
  accuracy REAL,
  location REAL,
  value REAL
);

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  imgUrl VARCHAR(150)
);

CREATE TABLE reviews (
  roomId INT NOT NULL,
  id INT PRIMARY KEY,
  accuracy SMALLINT,
  body VARCHAR(1000) NOT NULL,
  checkIn SMALLINT,
  cleanliness SMALLINT,
  communication SMALLINT,
  date DATE NOT NULL,
  location SMALLINT,
  score SMALLINT NOT NULL,
  userId INT NOT NULL,
  value SMALLINT,
  FOREIGN KEY (roomId) REFERENCES rooms(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

COPY rooms FROM '/Users/brandon/desktop/hr/sdc/database/csv/rooms.csv'
  DELIMITER ',' CSV HEADER;
COPY users FROM '/Users/brandon/desktop/hr/sdc/database/csv/users.csv'
  DELIMITER ',' CSV HEADER;
COPY reviews FROM '/Users/brandon/desktop/hr/sdc/database/csv/reviews.csv'
  DELIMITER ',' CSV HEADER;

\connect postgres;
