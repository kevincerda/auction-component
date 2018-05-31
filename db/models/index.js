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
  productName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

Product.hasMany(Bid, {foreignKey: 'productName', sourceKey: 'name'});
Bid.belongsTo(Product, {foreignKey: 'productName', sourceKey: 'name'});

db.sync()
  .then(() => console.log('synced db'))
  .catch(err => console.log('error syncing db', err))

module.exports = {
  Product: Product,
  Bid: Bid
};