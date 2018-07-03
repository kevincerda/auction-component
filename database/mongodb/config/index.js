require('newrelic');
const MongoClient = require('mongodb').MongoClient;
const URI = 'mongodb://localhost:27017/auction';
let _db, _products, _bids, productsId;
// require('../../seeds/genProductData.js');

MongoClient.connect(URI, { useNewUrlParser: true })
  .then(client => {
    console.log('Successfully connected to mongoDB');

    _db = client.db();
    _products = _db.collection('products')
    _bids = _db.collection('bids');

    // _products.createIndex({ id: -1 }, { name: 'products', unique: true })
    // .then(name => console.log(`Successfully created index for ${name}`))
    // .catch(err => console.error(`Error creating index for ${name}`, err));

    // _products.findOne({}, { fields: ['_id'], sort: [['_id', 'desc']] })
    // .then(({ _id }) => {
    //   productsId = _id + 1;
    //   console.log('The current id is:', _id);
    // });

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