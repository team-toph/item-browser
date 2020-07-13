const fs = require('fs');
const readline = require('readline');
const Sequelize = require('sequelize');
const path = require('path');

var start = Date.now();
const stream = fs.createReadStream('data.txt', 'utf8');

// connect to default
var sequelize = new Sequelize('postgres', 'main', 'user', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected');
  })
  .then(() => {
    return sequelize.query('DROP TABLE IF EXISTS products');
  })
  .then(() => {
    return sequelize.query(`CREATE TABLE products (
      id int,
      title VARCHAR,
      description VARCHAR,
      rating int,
      variations VARCHAR
    );`);
  })
  .then(() => {
    return stream.on('data', (chunk) => {
      var res = chunk.split('\r\n');
      // remove new line at end of array
      res.pop();
      res.forEach( (entry) => {
        var entry = JSON.parse(entry);
        var variations = JSON.stringify(entry.variations);
        return sequelize.query(`INSERT INTO products(id, title, description, rating, variations)
        VALUES (${entry.id}, '${entry.title}', '${entry.description}', ${entry.rating}, '${variations}');`);
      });
    });
  })
  .then(() => {
    return stream.on('end', function() {
      console.log('end');
    });
  })
  .catch((err) => {
    console.error('Connection to Postgres products db failed:', err);
  })
  .finally(() => {
    return console.log('Time to write (min): ', (Date.now() - start) / 60000);
  });