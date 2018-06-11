const SequelizeMock = require('sequelize-mock');

const dbMock = new SequelizeMock();

const ProductMock = dbMock.define('productMock', {
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
  }
});

const BidMock = dbMock.define('bidMock', {
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

ProductMock.hasMany(BidMock);
BidMock.belongsTo(ProductMock);

module.exports = {
  ProductMock: ProductMock,
  BidMock: BidMock
};
