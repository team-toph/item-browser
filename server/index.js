const express = require('express');
const app = express();
const Product = require('../db/model.js')
const port = 3000;

app.use(express.static('dist'));

app.get('/api/products', (req, res) => {
  const id = req.query.id;
  Product.findById(id)
    .then((product) => {
      res.status(200).send(product);
    });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));