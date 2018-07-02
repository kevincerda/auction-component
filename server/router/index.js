const router = require('express').Router();
const { productCtrl, productById } = require('../controllers/productCtrl.js');
const { bidCtrl, bidById } = require('../controllers/bidCtrl.js');

router.route('/auction/products')
  .post(productCtrl.POST)

router.route('/auction/product/:id')
  .get(productById.GET)
  .put(productById.PUT)
  .delete(productById.DELETE)

router.route('/auction/bids')
  .post(bidCtrl.POST)
  .put(bidCtrl.PUT)
  .delete(bidCtrl.DELETE)

router.route('/auction/bid/:id')
  .get(bidById.GET)

module.exports = {
  router
};