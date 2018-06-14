const Sequelize = require('sequelize');

const db = new Sequelize('auction', '', '', {
  host: 'db',
  dialect: 'postgresql'
});

db.authenticate()
  .then(() => console.log('db authenticated'))
  .catch(err => console.log('error authenticating db'))
  
module.exports = {
  db: db
};
