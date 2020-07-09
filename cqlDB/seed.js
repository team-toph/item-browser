const fs = require('fs');
const faker = require('faker');

// use mongodb for generating script
const db = require('./index.js');
const Product = require('./model.js');

const numOfDataPoints = 100000;
var filepath = "data.txt";
var stream = fs.createWriteStream(filepath);

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

    var createImage = function() {
      var url = 'http://picsum.photos/seed/'
      var urlend='/846/1038'
      var randomNumber = Math.floor(Math.random() * 1000);
      return url+randomNumber+urlend;
    }

    for (var j = 0; j < numOfImages; j++) {
      //var source = "https://picsum.photos/846/1038?random=" + imageCount;
      var source = createImage();
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

var createChunk = function(count) {
  var sampleData = [];
  for (var i = 0; i < count; i++) {
    var numOfVariations = Math.ceil((Math.random() * 4));
    var id = i + 1;
    sampleData.push(generateEntry(numOfVariations, id));
  }

  return JSON.stringify(sampleData);
}



var fileContent = createChunk(numOfDataPoints);

stream.once(filepath, (fd) => {
  stream.write(fd);
  stream.write("Second line\n");

  // Important to close the stream when you're ready
  stream.end();
});

for (var i = 0; i<100; i++) {
  fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
  })
}


console.log("The file was succesfully saved!");