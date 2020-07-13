const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const Product = require('../cqlDB/model.js');
const port = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
  const id = req.query.id;
  Product.find({id: id})
    .then((product) => {
      res.status(200).send(product);
    });
});

/////////////////////////////////////
// Set up these CRUD apis to route to current db, but create the 10M entries?
/////////////////////////////////////

app.post('/api/products', (req, res) => {
  const newEntry = req.body;

  Product.create(newEntry, err => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(req.body);
    }
  });
});

app.put('/api/products', (req, res) => {
  const id = req.query.id;
  const update = req.body;

  Product.update({id: id}, update, err => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(req.body);
    }
  });
});

app.delete('/api/products', (req, res) => {
  const id = req.query.id;
  console.log(id);

  Product.deleteOne({id: id}, err => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(req.body);
    }
  });
});

var server = app.listen(port, () => { console.log(`Listening at http://localhost:${port}`); });

module.exports = server;