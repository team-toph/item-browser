const express = require('express');
const cors = require('cors')
const app = express();
const Product = require('../db/model.js')
const port = 3000;

app.use(cors());
app.use(express.static('dist'));

app.get('/api/products', (req, res) => {
  const id = req.query.id;
  Product.find({id: id})
    .then((product) => {
      res.status(200).send(product);
    });
});

var server = app.listen(port, () => {console.log(`Listening at http://localhost:${port}`)});

module.exports = server;