const { Product, Bid } = require('../../db/models');

const AuctionController = {
  'GET': (req, res) => {
    Product.find({
      where: {
        name: req.body.name
      }
    }).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(404).send(err);
    })
  },

  'POST': (req, res) => {
    Product.update({
      watchers: Sequelize.literal('watchers + 1')
    }, {
      where: {
        name: req.body.name
      }
    }).then(() => {
      res.status(201).send('successfully updated watchers');
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

const BidController = {
  'GET': (req, res) => {
    //grab highest bid amount from column amount in bid table
    //get total number of bids made for an item
    //put both of these items in an object in the format: {amount: x, bids: y}
    Bid.find()
  },

  'POST': (req, res) => {

  }
};

module.exports = {
  AuctionController: AuctionController,
  BidController: BidController
};