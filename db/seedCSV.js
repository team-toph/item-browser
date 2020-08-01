const fs = require('fs');
const faker = require('faker');
var filepath = 'data.csv';
var stream = fs.createWriteStream(filepath, {flags: 'a'});

var generateEntry = function(idCount) {
  var randomTitle = faker.commerce.productName();
  var randomDescription = faker.lorem.paragraph();
  var randomRating = Math.random() * 5;
  var variations = [];
  var imageCount = 1;
  var numOfVariations = Math.ceil((Math.random() * 4));

  for (var i = 0; i < numOfVariations; i++) {
    var randomColor = faker.commerce.color();
    var randomCost = faker.commerce.price();
    var numOfImages = Math.ceil((Math.random() * 5));
    var randomImages = [];

    var createImage = function() {
      var url = 'http://picsum.photos/seed/';
      var urlend = '/846/1038';
      var randomNumber = Math.floor(Math.random() * 1000);
      return url + randomNumber + urlend;
    };

    for (var j = 0; j < numOfImages; j++) {
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

var idCount = 0;
var start = Date.now();
var i = 10000000;
var write = function() {
  let ok = true;
  while (idCount < i && ok) {
    var newEntry = generateEntry(idCount);
    var id = newEntry.id;
    var title = JSON.stringify(newEntry.title);
    var description = JSON.stringify(newEntry.description);
    var rating = newEntry.rating;
    var variations = JSON.stringify(newEntry.variations);
    ok = stream.write( `${id}|${title}|${description}|${rating}|"${variations}"` + '\r\n');
    idCount++;
  }

  if (idCount < i) {
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