const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { router } = require('./router');
require('../db/models');

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    console.log('error connecting to port', port);
  } else {
    console.log('successfully connected to port', port);
  }
});