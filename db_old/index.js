const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://18.191.148.100/products');
// db.on('error', console.error('connection error'));
// db.on('open', function() {
//   console.log('Successfully connected');
// })

module.exports = db;