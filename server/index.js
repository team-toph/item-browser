require('newrelic');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const ipPath = 'localhost';
const client = require('./dbClient.js');
const redis = require('redis');

const redisClient = redis.createClient({
  port: 6379,
  host: '127.0.0.1'
});

redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/products', (req, res, next) => {
  const id = req.query.id;
  const redisQuery = (req.query.query);
  redisClient.get(`id:${redisQuery}`, (result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {
      return client.query(`select * from products where id=${id}`)
        .then((entry) => {
          entry = entry[0][0];
          entry.title = entry.title.slice(1, -1);
          entry.description = entry.description.slice(1, -1);
          entry.variations = JSON.parse(entry.variations.slice(1, -1));
          res.status(200).send(entry);
          const responseJSON = entry;
          console.log(entry);
          redisClient.setex(`id:${redisQuery}`, 3600, JSON.stringify({ source: 'Redis Cache', ...responseJSON}));
        })
        .then(() => {
          res.status(200).json({ source: 'SDC Postgres', ...responseJSON, })
        });
    }
  })
});

app.get('/loaderio-2cbad74acad0c5feaab64f03ceaaf032', (req, res) => {
  var tok = 'loaderio-2cbad74acad0c5feaab64f03ceaaf032';
  res.status(200).send(tok);
});

app.post('/api/products', (req, res, next) => {

  var id = req.body.id;
  var title = JSON.stringify(req.body.title);
  var description = JSON.stringify(req.body.description);
  var rating = req.body.rating;
  var variations = JSON.stringify(req.body.variations);

  var query =
    `INSERT INTO products (id,title,description,rating,variations) VALUES (${id},'${title}','${description}',${rating},'${variations}') RETURNING id`;
  client
    .query(query)
    .then((entry) => {
      res.status(200).send(entry);
    })
    .catch(next);
});

app.put('/api/products', (req, res) => {
  const id = req.query.id;
  var title = JSON.stringify(newEntry.title);

  client.query(`update products set title=${title} where id=${id}`)
    .then((entry) => {
      res.status(200).send(entry);
    })
    .catch((err) => {
      console.error('Put to Postgres products db failed:', err);
    });
});

app.delete('/api/products', (req, res) => {
  const id = req.query.id;

  client.query(`delete from products where id=${id}`)
    .then((entry) => {
      res.status(200).send(entry);
    })
    .catch((err) => {
      console.error('Delete to Postgres products db failed:', err);
    });
});

var server = app.listen(port, () => { console.log(`Listening at http://${ipPath}:${port}`); });

module.exports = server;