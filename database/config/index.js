// Sequelize && Postgre

// const Sequelize = require('sequelize');

// const db = new Sequelize('auction', 'em', 'mars', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// db.authenticate()
//   .then(() => console.log('db authenticated'))
//   .catch(err => console.log('error authenticating db', err))
  
// module.exports = {
//   db: db
// };

// MongoDB

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'auction';

MongoClient.connect(url, (err, client) => {
  err ? console.log('Error connecting to database') : console.log('Successfully connected to database');

  const db = client.db(dbName);
  client.close();
});