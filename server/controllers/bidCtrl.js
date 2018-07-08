const { bids } = require('../../database/mongodb/config');

module.exports = {
  bidCtrl: {
    POST: (req, res) => {
      bids().insert({
        product_id: req.body.product_id,
        customer: req.body.name,
        bid: req.body.bid
      })
      .then(data => {
        console.log('Successfully inserted document', data);
        res.status(201).send(data);
      })
      .catch(err => {
        console.error('Error inserting document into databse', err);
        res.stats(400).send(err);
      })
    }
  },
  bidById: {
    GET: (req, res) => {
      const id = Number(req.params.id);
      bids().findOne({
        id: id
      })
      .then(data => {
        console.log(`Succesfully fetched bid document with id: ${id}`, data);
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(`Error fetching bid document with id: ${id}`, err);
        res.send(err);
      })
    },
    PUT: (req, res) => {
      bids().update({
        id: req.body.id
      }, {
        $set: {
          bid: req.body.bid
        }
      })
      .then(data => {
        console.log('Succesfully updated document', data);
        res.status(201).send(data);
      })
      .catch(err => {
        console.error('Error updating document', err);
        res.status(400).send(err);
      })
    },
    DELETE: (req, res) => {
      bids().remove({
        id: req.body.id
      }, 1)
      .then(data => {
        console.log(`Successfully deleted document`);
        res.status(200).send(data);
      })
      .catch(err => {
        console.error('Error deleting document', err);
        res.status(400).send(data);
      })
    }
  }
}
