const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const client = require('../db/index.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
  const id = req.query.id;
  console.log(id);
  client.query(`select * from products where id=${id}`)
    .then((entry) => {
      entry = entry[0][0];
      entry.title = entry.title.slice(1, -1);
      entry.description = entry.description.slice(1, -1);
      entry.variations = JSON.parse(entry.variations.slice(1, -1));
      res.status(200).send(entry);
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