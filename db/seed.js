const faker = require('faker');
const db = require('./index.js');
const Product = require('./model.js');

const numOfDataPoints = 10;

var generateEntry = function(numOfVariations) {

  var randomTitle = faker.commerce.productName();
  var randomDescription = faker.lorem.paragraph();
  var variations = [];
  var imageCount = 1;

  for (var i = 0; i < numOfVariations; i++) {
    var randomColor = faker.commerce.color(); // Fender Stratocaster
    var randomCost = faker.commerce.price(); // 492.00
    var numOfImages = Math.ceil((Math.random() * 5));
    var randomImages = [] // 4 random image urls

    for (var j = 0; j < numOfImages; j++) {
      var source = "https://picsum.photos/846/1038?random=" + imageCount;
      randomImages.push({src: source})
      imageCount++;
    }

    var variation = {
      color: randomColor,
      cost: randomCost,
      images: randomImages
    }
    variations.push(variation);
  }

  var entry = {
    title: randomTitle,
    description: randomDescription,
    variations : variations
  }
  return entry;
}

var seedDatabase = function() {
  var sampleData = [];
  for (var i = 0; i < numOfDataPoints; i++) {
    var numOfVariations = Math.ceil((Math.random() * 4));
    sampleData.push(generateEntry(numOfVariations));
  }

  Product.create(sampleData)
    .then(() => db.disconnect());
}

seedDatabase();
