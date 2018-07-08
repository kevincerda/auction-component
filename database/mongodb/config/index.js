const MongoClient = require('mongodb').MongoClient;
const URI = 'mongodb://18.208.249.89:27017/auction';
let _db, _products, _bids, productsId;

MongoClient.connect(URI, { useNewUrlParser: true })
  .then(client => {
    console.log('Successfully connected to mongoDB');

    _db = client.db();
    _products = _db.collection('products');
    _bids = _db.collection('bids');

    _products.createIndex({ _id: -1 }, { name: 'products' })

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
  products,
  productsId
}