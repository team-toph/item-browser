const faker = require('faker');
const db = require('./index.js');
const Product = require('./model.js');

const numOfDataPoints = 10;

var generateEntry = function(numOfVariations) {

  var variations = [];

  for (var i = 0; i < numOfVariations; i++) {
    var randomTitle = faker.commerce.productName(); // Fender Stratocaster
    var randomCost = faker.commerce.price(); // 492.00
    var randomImages = [
      {src: faker.image.imageUrl()},
      {src: faker.image.imageUrl()},
      {src: faker.image.imageUrl()},
      {src: faker.image.imageUrl()}
    ] // 4 random image urls

    var variation = {
      title: randomTitle,
      cost: randomCost,
      images: randomImages
    }
    variations.push(variation);
  }

  var entry = {
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
