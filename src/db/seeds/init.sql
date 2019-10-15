CREATE DATABASE youtubify;
\c youtubify;
CREATE TABLE tracks (
   id VARCHAR(255) PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   artist VARCHAR(50) NOT NULL,
   category VARCHAR(50) NOT NULL,
   date VARCHAR(255) NOT NULL,
   path VARCHAR(255) NOT NULL,
   length VARCHAR(50) NOT NULL
);