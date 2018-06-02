const Sequelize = require('sequelize');
const Promise = require('bluebird');
const { Product, Bid } = require('../../database/models');

const AuctionController = {
  'GET': (req, res) => {
    Product.find({
      where: { id: 1 }
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

//in controller
//fix AuctionController.post, watchers doesnt seem to update
  //if not using sequelize function, remove from first line
//add a conditional that only allows user to post if the bid is higher than value in db and also is above
//the minimum bid value

//in client
//eventually want to make a request to the product's id in the endpoint
  //get request from /api/auction/bid/:id
  //req.params (test with postman)
//display time left for auction, not the time it ends