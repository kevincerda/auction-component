const db = require('../../database/mongodb/config');

module.exports = {
  bidCtrl: {
    POST: (req, res) => {
      db.bids.insert({
        product_id: req.body.product_id,
        customer: req.body.name,
        bid: req.body.bid
      })
      .then(data => {
        console.log('Successfully inserted document', data);
        res.status(201).send(data);
      })
      .catch(err => {
        console.log('Error inserting document into databse', err);
        res.stats(400).send(err);
      })
    },
    PUT: (req, res) => {
      db.bids.update({
        _id: req.body.id
      }, {
        $set: {
          bid: req.body.bid
        }
      })
      .then(data => {
        console.log('Succesfully updated document');
        res.status(201).send(data);
      })
      .catch(err => {
        console.log('Error updating document', err);
        res.status(400).send(err);
      })
    },
    DELETE: (req, res) => {
      db.bids.remove({
        _id: req.body.id
      }, 1)
      .then(data => {
        console.log('Successfully deleted document');
        res.status(200).send(data);
      })
      .catch(err => {
        console.log('Error deleting document', err);
        res.status(400).send(data);
      })
    }
  }
}
