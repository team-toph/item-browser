const fs = require('fs');
const faker = require('faker');


var filepath = 'data.txt';
// flag 'a': Open file for appending. The file is created if it does not exist.
var stream = fs.createWriteStream(filepath, {flags: 'a'});

var generateEntry = function(idCount) {

  var randomTitle = faker.commerce.productName();
  var randomDescription = faker.lorem.paragraph();
  var randomRating = Math.random() * 5;
  var variations = [];
  var imageCount = 1;
  var numOfVariations = Math.ceil((Math.random() * 4));

  for (var i = 0; i < numOfVariations; i++) {
    var randomColor = faker.commerce.color(); // Fender Stratocaster
    var randomCost = faker.commerce.price(); // 492.00
    var numOfImages = Math.ceil((Math.random() * 5));
    var randomImages = []; // 4 random image urls

    var createImage = function() {
      var url = 'http://picsum.photos/seed/';
      var urlend = '/846/1038';
      var randomNumber = Math.floor(Math.random() * 1000);
      return url + randomNumber + urlend;
    };

    for (var j = 0; j < numOfImages; j++) {
      //var source = "https://picsum.photos/846/1038?random=" + imageCount;
      var source = createImage();
      randomImages.push({src: source});
      imageCount++;
    }

    var variation = {
      color: randomColor,
      cost: randomCost,
      images: randomImages
    };
    variations.push(variation);

  }

  var entry = {
    id: idCount,
    title: randomTitle,
    description: randomDescription,
    rating: randomRating.toFixed(2),
    variations: variations
  };

  return entry;
};

// add to file for each ("write" will create file if it doesnt exist)
// refer to drain for when writes clog stream
var idCount = 0;
var start = Date.now();
var i = 10000000;
var write = function() {
  let ok = true;
  while (idCount < i && ok) {
    // See if we should continue, or wait.
    ok = stream.write(JSON.stringify(generateEntry(idCount)) + '\r\n');
    idCount++;
  }

  if (idCount < i) {
    // Had to stop early!
    // Write some more once it drains.
    stream.once('drain', write);
  } else {
    stream.end();
    console.log('Time to write (min): ', (Date.now() - start) / 1000 / 60);
    console.log(idCount, i);
  }
};


write();

module.exports.write = write;
module.exports.generateEntry = generateEntry;