const mongoose = require('mongoose');
const ipPath = 'localhost';
const db = mongoose.connect(`mongodb://${ipPath}/products`);
// db.on('error', console.error('connection error'));
// db.on('open', function() {
//   console.log('Successfully connected');
// })

module.exports = db;