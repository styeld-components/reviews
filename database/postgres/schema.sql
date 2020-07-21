/* to run this file:
  psql postgres
  \i /users/brandon/desktop/hr/sdc/database/postgres/schema.sql
*/

DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\connect sdc;

CREATE TABLE rooms (
  id INT PRIMARY KEY,
  score REAL NOT NULL,
  cleanliness REAL,
  communication REAL,
  check_in REAL,
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
  room_id INT NOT NULL,
  date DATE NOT NULL,
  accuracy SMALLINT,
  body VARCHAR(1000) NOT NULL,
  check_in SMALLINT,
  cleanliness SMALLINT,
  communication SMALLINT,
  id INT PRIMARY KEY,
  location SMALLINT,
  score SMALLINT NOT NULL,
  user_id INT NOT NULL,
  value SMALLINT,
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- for local
-- COPY rooms FROM '/Users/brandon/desktop/hr/sdc/database/csv/rooms.csv'
--   DELIMITER ',' CSV HEADER;
-- COPY users FROM '/Users/brandon/desktop/hr/sdc/database/csv/users.csv'
--   DELIMITER ',' CSV HEADER;
-- COPY reviews FROM '/Users/brandon/desktop/hr/sdc/database/csv/reviews.csv'
--   DELIMITER ',' CSV HEADER;

-- for EC2
COPY rooms FROM '/tmp/rooms.csv'
  DELIMITER ',' CSV HEADER;
COPY users FROM '/tmp/users.csv'
  DELIMITER ',' CSV HEADER;
COPY reviews FROM '/tmp/reviews.csv'
  DELIMITER ',' CSV HEADER;

\connect postgres;
