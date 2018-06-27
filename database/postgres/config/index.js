const Sequelize = require('sequelize');

const db = new Sequelize('auction', 'em', 'mars', {
  host: 'localhost',
  dialect: 'postgres'
});

db.authenticate()
  .then(() => console.log('Successfully connected to PostgreSQL'))
  .catch(err => console.log('Unable to connect to PostgreSQL', err))
  
module.exports = {
  db: db
};