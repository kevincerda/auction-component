const Sequelize = require('sequelize');
const { Product, Bid } = require('../../database/models');

const AuctionController = {
  'GET': (req, res) => {
    let query = {};
    if (req.params.id) {
      query.id = req.params.id;
    } else if (req.params.name) {
      query.name = req.params.name
    }
    Product.find({
      where: query
    }).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(404).send(err);
    })
  },

  'POST': (req, res) => {
    let query = {};
    if (req.params.id) {
      query.id = req.params.id;
    } else if (req.params.name) {
      query.name = req.params.name
    }
    Product.update({
      watchers: Sequelize.literal('watchers + 1')
    }, {
      where: query
    }).then(() => {
      res.status(201).send();
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

const BidController = {
  'GET': (req, res) => {
    let data = {};
    Promise.all([
      Bid.count({ where: { productId: 1 }}),
      Bid.max('amount', { where: { productId: 1 }})
    ]).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(404).send(err);
    })
  },

  'POST': (req, res) => {
    Product.find({
      where: { id: req.body.id }
    }).then(foundProduct => {
      foundProduct.createBid({
        amount: req.body.bidInput
      })
    }).then(() => {
      res.status(201).send();
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

module.exports = {
  AuctionController: AuctionController,
  BidController: BidController
};
