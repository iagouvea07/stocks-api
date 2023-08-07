CREATE DATABASE stocks DEFAULT CHARSET UTF8;

USE stocks;

CREATE TABLE quote (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ticker VARCHAR(10),
    name VARCHAR(50),
    price FLOAT,
    variation FLOAT,
    logo VARCHAR(200),
    sector VARCHAR(50),
    creation_date DATE
);

INSERT INTO quote (ticker, name, price, variation, logo, sector, creation_date) 
VALUES (?, ?, ?, ?, ?, ?, ?)
