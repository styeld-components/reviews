CREATE KEYSPACE IF NOT EXISTS sdc
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };
// USE sdc;

CREATE TABLE rooms (
  id uuid PRIMARY KEY,
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
  id uuid,
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
  id uuid PRIMARY KEY;
  username varchar(30),
  imgUrl varchar(60)
);

CREATE TABLE reviews_by_users (
  id uuid,
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
