const router = require('express').Router();
const { AuctionController, BidController } = require('../controllers');

router.route('/auction')
  .get(AuctionController.GET)
  .post(AuctionController.POST)

router.route('/auction/bid')
  .get(BidController.GET)
  .post(BidController.POST)

module.exports = {
  router: router
};