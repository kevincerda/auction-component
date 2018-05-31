const Sequelize = require('sequelize');
const { db } = require('../config');

const Product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  productName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  condition: {
    type: Sequelize.STRING,
    allowNull: false
  },

  minimum: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  watchers: {
    type: Sequelize.INTEGER,
    allowNull: true
  },

  endtime: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

const Bid = db.define('bid', {
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

Product.hasMany(Bid);
Bid.belongsTo(Product);

db.sync()
  .then(() => {
    Product.create({
      productName: 'Eachine E58 2MP 720P Camera WIFI FPV Foldable Drone 2.4G 6-Axis RC Quadcopter',
      condition: 'used',
      minimum: 5.00,
      watchers: 8,
      endtime: new Date(2018, 6, 10, 0)
    });
  })
  .catch(err => console.log('error syncing db', err))

module.exports = {
  Product: Product,
  Bid: Bid
};