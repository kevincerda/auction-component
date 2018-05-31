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
    
  }
};

const BidController = {
  'GET': (req, res) => {

  },

  'POST': (req, res) => {

  }
};

module.exports = {
  AuctionController: AuctionController,
  BidController: BidController
};