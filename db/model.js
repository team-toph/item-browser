const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  rating: Number,
  variations : [
    {
      color: String,
      images: [{src: String}],
      cost: Number
    }
  ]
})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;