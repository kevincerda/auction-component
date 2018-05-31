const Sequelize = require('sequelize');
const { Product, Bid } = require('../../db/models');

const AuctionController = {
  'GET': (req, res) => {
    Product.find({
      where: {
        name: 'Eachine E58 2MP 720P Camera WIFI FPV Foldable Drone 2.4G 6-Axis RC Quadcopter'
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
        id: req.body.id
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
    let bidCount = 0;
    Bid.count({
      where: {
        productId: req.body.id
      }
    }).then(count => {
      bidCount = count;
      Bid.max({
        where: {
          productId: req.body.id
        }
      })
    }).then(max => {
      res.status(201).send();
      console.log('*******************COUNT = ', count);
    }).catch(err => {
      res.status(404).send(err);
    })
  },

  'POST': (req, res) => {
    Product.find({
      where: {
        name: req.body.name
      }
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


//in client
//add a handler for getting highest bid and bid count
  //get request from /api/auction/bid/:id
  //req.params (test with postman)
  //check the syntax of url
//chain the get request for /bid/:id to the post request
//figure out how to display time left for auction

//in controller
//see if i can chain together count and max somehow and send them back together in 1 object
  //console logs to see that i am sending back the correct data
//see that page is rendering dynamically on bid post
  //add a conditional that only allows user to post if the bid is higher than value in db and also is above
  //the minimum bid value
  //see if i can refactor the post so that I dont initially have to query the product table and then create
  //the bid off of that found instance
//fix AuctionController.post, watchers doesnt seem to update
  //if not using sequelize function, remove from first line