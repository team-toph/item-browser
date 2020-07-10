const fs = require('fs');
const promise = require('fs/promises')
const db = require('./index.js');
const Product = require('./model.js');
const data = require('../data.txt');


fs.readFile('data.txt', 'utf8', (err, data) => {
  var res = JSON.parse(data);
  res.forEach( entry => Product.create(entry));
  if (err) {
    console.log(err);
  }


})
  // .then(() => db.disconnect())
  // .catch((error) => console.log(error));

