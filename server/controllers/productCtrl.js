const { products } = require('../../database/mongodb/config');

module.exports = {
  productCtrl: {
    POST: (req, res) => {
      products().insert({
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
    }
  },
  productById: {
    GET: (req, res) => {
      const id = JSON.parse(req.params.id);
      console.log(`Fetching document with id: ${id}`)
      products().findOne({
        _id: id
      })
      .then(data => {
        console.log(`Succesfully fetched document with id: ${id}`, data);
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(`Error fetching document with id: ${id}`, err);
        res.send(err);
      });
    },
    PUT: (req, res) => {
      const id = JSON.parse(req.params.id);
      products().update({
        _id: id
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
      const id = JSON.parse(req.params.id);
      products().remove({
        _id: id
      }, 1)
      .then(data => {
        console.log(`Successfully deleted document with id: ${id}`);
        res.status(200).send();
      })
      .catch(err => {
        console.log(`Error deleting document with id: ${id}`, err);
        res.stats(400).send(err);
      })
    }
  },
}