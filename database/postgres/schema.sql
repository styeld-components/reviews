DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
USE sdc;

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
  date DATE NOT NULL,
  body VARCHAR(1000) NOT NULL,
  score TINYINT NOT NULL,
  cleanliness TINYINT,
  communication TINYINT,
  checkIn TINYINT,
  accuracy TINYINT,
  location TINYINT,
  value TINYINT,
  roomId REFERENCES rooms (id),
  userId REFERENCES users (id)
);
