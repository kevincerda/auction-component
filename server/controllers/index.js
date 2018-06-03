const Sequelize = require('sequelize');
const Promise = require('bluebird');
const { Product, Bid } = require('../../database/models');

const AuctionController = {
  'GET': (req, res) => {
    console.log('getting into controller')
    console.log(req.params);
    Product.find({
      where: { id: req.params.id }
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
      where: { id: req.body.id }
    }).then(() => {
      res.status(201).send('successfully updated watchers');
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
        amount: req.body.bidAmount
      })
    }).then(data => {
      res.status(201).send(data);
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

module.exports = {
  AuctionController: AuctionController,
  BidController: BidController
};
