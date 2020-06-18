const faker = require('faker');
const db = require('./index.js');
const Product = require('./model.js');

const numOfDataPoints = 10;

var generateEntry = function(numOfVariations) {
  var randomTitle = faker.commerce.productName(); // Fender Stratocaster
  var randomCost = faker.commerce.price(); // 492.00
  var randomImages = [
    {src: faker.image.imageUrl()},
    {src: faker.image.imageUrl()},
    {src: faker.image.imageUrl()},
    {src: faker.image.imageUrl()}
  ] // 4 random image urls

  var randomVariations = [];
  for (var i = 0; i < numOfVariations; i++) {
    randomVariations.push({id: faker.random.number(numOfDataPoints)});
  } // random id numbers with a max of the number of entries

  var entry = {
    title : randomTitle,
    images : randomImages,
    cost : randomCost,
    variants : randomVariations
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
