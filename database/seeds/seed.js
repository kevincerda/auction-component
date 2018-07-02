require('./genProductData.js');

const productSeeds = [
  {name: "Eachine E58 2MP 720P Camera WIFI FPV Foldable Drone 2.4G 6-Axis RC Quadcopter", condition: "New", minimum: 10, watchers: 3, createdAt: new Date(), updatedAt: new Date()}
]

const bidSeeds = [
  {productId: 1, amount: 140.00, createdAt: new Date(), updatedAt: new Date()}
]

module.exports = {
  productSeeds: productSeeds,
  bidSeeds: bidSeeds
};