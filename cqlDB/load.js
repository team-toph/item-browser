const fs = require('fs');
const promise = require('fs/promises')
const db = require('./index.js');
const Product = require('./model.js');
// const data = require('../data.txt');


fs.readFile('data.txt', 'utf8', (err, data) => {
  var res = data.split('\r\n');
  // remove new line at end of array
  res.pop();

  //console.log(res);
  //res.forEach( entry => console.log(entry));
  res.forEach( entry => Product.create(JSON.parse(entry)));
  if (err) {
    console.log(err);
  }


})

// var load = function() {
//   const stream = fs.createReadStream('data.txt', {start: 0, end: 10} );
//   var set = 0;
//   var readSize = 10;

//   stream.on('data', function(data) {
//     var res = JSON.parse(data);
//     set += data.length;
//     res.forEach( entry => Product.create(entry));
//   });

//   stream.on('end', function()
//   {
//     console.log('start zeroed, Read:', set, 'Expected:', readSize);
//   });

// }

// load();
// .then(() => db.disconnect())
// .catch((error) => console.log(error));


// module.exports = load;