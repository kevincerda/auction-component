const db = require('../../database/mongodb/config');

module.exports = {
  productCtrl: {
    POST: (req, res) => {
      db.products.insert({
        name: req.body.name,
        condition: req.body.condition,
        minimum: req.body.minimum,
        bid: req.body.bid,
        watchers: req.body.watchers,
        created: req.body.created,
        updated: req.body.updadted
      })
      .then(data => {
          console.log('Succesfully inserted document', data);
          res.status(201).send(data);
      })
      .catch(err => {
          console.log('Error inserting document into database', err);
          res.status(400).send(err);
      });
    },
    PUT: (req, res) => {
      db.products.update({
        _id: req.body.id
      }, {
        $set: {
          name: req.body.name,
          condition: req.body.condition,
          minimum: req.body.minimum,
          bid: req.body.bid,
          watchers: req.body.watchers,
          created: req.body.created,
          updated: req.body.updadted
        }
      }, {
        multi: true
      })
      .then(data => {
        console.log('Successfully updated document');
        res.status(201).send(data);
      })
      .catch(err => {
        console.log('Error updating document', err);
        res.status(400).send(err);
      });
    },
    DELETE: (req, res) => {
      db.products.remove({
        _id: req.body.id
      }, 1)
      .then(data => {
        console.log('Successfully deleted document');
        res.status(200).send(data);
      })
      .catch(err => {
        console.log('Error deleting document', err);
        res.stats(400).send(err);
      })
    }
  },
  productById: {
    GET: (req, res) => {
      db.products.find({
        _id: req.params.id
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.send(err);
      });
    }
  },
}
