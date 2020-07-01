const faker = require('faker');
const db = require('./index.js');
const Product = require('./model.js');

const numOfDataPoints = 100;

var generateEntry = function(numOfVariations, newId) {

  var randomTitle = faker.commerce.productName();
  var randomDescription = faker.lorem.paragraph();
  var randomRating = Math.random() * 5;
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
    id: newId,
    title: randomTitle,
    description: randomDescription,
    rating: randomRating.toFixed(2),
    variations : variations
  }
  return entry;
}

var seedDatabase = function() {
  var sampleData = [];
  for (var i = 0; i < numOfDataPoints; i++) {
    var numOfVariations = Math.ceil((Math.random() * 4));
    var id = i + 1;
    sampleData.push(generateEntry(numOfVariations, id));
  }

  Product.create(sampleData)
    .then(() => db.disconnect())
    .catch((error) => console.log(error));
}

seedDatabase();
