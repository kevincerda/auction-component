const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'auction';
require('./../../seeds/seed.js');

MongoClient.connect(url, (err, client) => {
  err ? console.log('Error connecting to database') : console.log('Successfully connected to mongoDB');

  const db = client.db(dbName);

  db.createCollection('products', (err) => {
    err ? console.log('Failed to create collection', err) : console.log('Successfully created collection');
  });

  // insert into db

  // client.close();
});