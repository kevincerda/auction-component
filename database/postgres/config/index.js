const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auction',
  password: 'iamroot'
});

pool.connect((err) => {
  err ? console.log('Unable to connect to PostgreSQL database', err) : console.log('Successfully connected to PostgreSQL');
});

module.exports = {
  pool,
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('Executed query:', { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  }
};