DROP DATABASE IF EXISTS auction;
CREATE DATABASE auction;

USE auction;

CREATE TABLE products (
  id serial primary key,
  name varchar(256),
  condition varchar(256),
  minimum decimal,
  bid decimal,
  watchers int,
  created varchar(256),
  updated varchar(256)
);

CREATE TABLE bids (
  id serial primary key,
  product_id int,
  customer varchar(256),
  bid decimal
);

-- \copy bids FROM 'C:\Users\Kevin\Desktop\HRLA22\SDC\auction-component\bids.csv' DELIMITER ','  CSV;
-- \copy products FROM 'C:\Users\Kevin\Desktop\HRLA22\SDC\auction-component\product.csv' DELIMITER ','  CSV;