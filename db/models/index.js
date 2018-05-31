const Sequelize = require('sequelize');
const { db } = require('../config');
const { initialize } = require('../seed/seed');

const Product = db.define('product', {
  name: {
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
  .then(initialize.product()).then(initialize.bid()).then(() => console.log('successfully synced to db'))
  .catch(err => console.log('error syncing db', err))

module.exports = {
  Product: Product,
  Bid: Bid
};