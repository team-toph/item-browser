const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  variations : [
    {
      title: String,
      images: [{src: String}],
      cost: Number
    }
  ]
})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;