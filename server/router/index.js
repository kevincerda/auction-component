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
  
  router.route('/auction/bid/:id')
  .get(bidById.GET)
  .put(bidById.PUT)
  .delete(bidById.DELETE)
  
module.exports = {
  router
};