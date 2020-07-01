const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const path = require('path');
const app = express();
const Product = require('../db/model.js')
const port = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../dist')))

app.get('/api/products', (req, res) => {
  const id = req.query.id;
  Product.find({id: id})
    .then((product) => {
      res.status(200).send(product);
    });
});

var server = app.listen(port, () => {console.log(`Listening at http://localhost:${port}`)});

module.exports = server;