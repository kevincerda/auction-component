const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('./router');
require('../database/mongodb/config');

const port = 9000;
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public/')));
app.use('/api', router);

app.listen(port, (err) => {
  err ? console.log('Error connecting to server', err) : console.log('Successfully connected to server on port', port);
});