/* to run this file:
  psql postgres
  \i ./desktop/hr/sdc/database/postgres/schema.sql
*/

DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\connect sdc;

CREATE TABLE rooms (
  id INT PRIMARY KEY,
  reviews SMALLINT NOT NULL,
  score FLOAT NOT NULL,
  cleanliness FLOAT,
  communication FLOAT,
  checkIn FLOAT,
  accuracy FLOAT,
  location FLOAT,
  value FLOAT
);

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  imgUrl VARCHAR(150)
);

CREATE TABLE reviews (
  id INT PRIMARY KEY,
  roomId INT NOT NULL,
  userId INT NOT NULL,
  date VARCHAR(30) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  score SMALLINT NOT NULL,
  cleanliness SMALLINT,
  communication SMALLINT,
  checkIn SMALLINT,
  accuracy SMALLINT,
  location SMALLINT,
  value SMALLINT,
  FOREIGN KEY (roomId) REFERENCES rooms(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

COPY rooms FROM '/Users/brandon/desktop/hr/sdc/database/postgres/csv/rooms.csv'
  DELIMITER ',' CSV HEADER;
COPY users FROM '/Users/brandon/desktop/hr/sdc/database/postgres/csv/users.csv'
  DELIMITER ',' CSV HEADER;
COPY reviews FROM '/Users/brandon/desktop/hr/sdc/database/postgres/csv/reviews.csv'
  DELIMITER ',' CSV HEADER;

\connect postgres;
