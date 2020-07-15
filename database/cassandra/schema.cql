/* to run this file:
  cqlsh
  source '/users/brandon/desktop/hr/sdc/database/cassandra/schema.cql';
*/

DROP KEYSPACE IF EXISTS sdc;
CREATE KEYSPACE sdc
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };
USE sdc;

CREATE TABLE rooms (
  id int PRIMARY KEY,
  reviews smallint,
  score float,
  cleanliness float,
  communication float,
  checkIn float,
  accuracy float,
  location float,
  value float
);

CREATE TABLE reviews_by_room (
  id int,
  roomId int,
  userId int,
  date timestamp,
  body text,
  score tinyint,
  cleanliness tinyint,
  communication tinyint,
  checkIn tinyint,
  accuracy tinyint,
  location tinyint,
  value tinyint,
  PRIMARY KEY (roomId, id)
);

CREATE TABLE users (
  id int PRIMARY KEY,
  username text,
  imgUrl text
);

CREATE TABLE reviews_by_user (
  id int,
  roomId int,
  userId int,
  date timestamp,
  body text,
  score tinyint,
  cleanliness tinyint,
  communication tinyint,
  checkIn tinyint,
  accuracy tinyint,
  location tinyint,
  value tinyint,
  PRIMARY KEY (userId, id)
);

COPY rooms FROM '/Users/brandon/desktop/hr/sdc/database/csv/rooms.csv'
  WITH DELIMITER=',' AND HEADER=TRUE;
COPY users FROM '/Users/brandon/desktop/hr/sdc/database/csv/users.csv'
  WITH DELIMITER=',' AND HEADER=TRUE;
COPY reviews_by_room FROM '/Users/brandon/desktop/hr/sdc/database/csv/reviews.csv'
  WITH DELIMITER=',' AND HEADER=TRUE;
COPY reviews_by_user FROM '/Users/brandon/desktop/hr/sdc/database/csv/reviews2.csv'
  WITH DELIMITER=',' AND HEADER=TRUE;
