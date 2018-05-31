const Sequelize = require('sequelize');
const { db } = require('../config');

const Product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

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
  product_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    allowNull: false
  },

  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

db.sync()
  .then(() => console.log('synced db'))
  .catch(err => console.log('error syncing db', err))

module.exports = {
  Product: Product,
  Bid: Bid
};