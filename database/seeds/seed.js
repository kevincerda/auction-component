const { bidRecords, productRecords } = require('./fakeDataGenerator.js');

const productSeeds = productRecords;

const bidSeeds = bidRecords;

module.exports = {
  productSeeds: productSeeds,
  bidSeeds: bidSeeds
};