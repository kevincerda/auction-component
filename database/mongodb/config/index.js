const MongoClient = require('mongodb').MongoClient;
const URI = 'mongodb://localhost:27017/auction';
let _db, _products, _bids;

MongoClient.connect(URI, { useNewUrlParser: true })
  .then(client => {
    console.log('Successfully connected to mongoDB');

    _db = client.db();
    _products = _db.collection('products');
    _bids = _db.collection('bids');
  })
  .catch(err => {
    console.log('Error connecting to mongoDB');
    throw err;
  });

const db = () => _db;
const bids = () => _bids;
const products = () => _products;

module.exports = {
  db,
  bids,
  products
}