const { Client } = require('pg');

const client = new Client({
  user: 'em',
  host: 'localhost',
  database: 'auction',
  password: 'mars'
});

client.connect((err) => {
  err ? console.log('Unable to connect to PostgreSQL database', err) : console.log('Successfully connected to PostgreSQL');
});

module.exports = {
  client
};