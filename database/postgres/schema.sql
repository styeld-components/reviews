DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
USE sdc;

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  reviews SMALLINT,
  score FLOAT,
  cleanliness FLOAT,
  communication FLOAT,
  checkIn FLOAT,
  accuracy FLOAT,
  location FLOAT,
  value FLOAT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  imgUrl VARCHAR(150)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  roomId INT,
  userId INT,
  date DATE,
  body VARCHAR(1000),
  score TINYINT,
  cleanliness TINYINT,
  communication TINYINT,
  checkIn TINYINT,
  accuracy TINYINT,
  location TINYINT,
  value TINYINT,
  FOREIGN KEY (roomId) REFERENCES rooms (id),
  FOREIGN KEY (userId) REFERENCES rooms (id)
);
