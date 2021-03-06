const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');

var start = Date.now();
const stream = fs.createReadStream('data.csv', 'utf8');

const ipPath = 'localhost';

var sequelize = new Sequelize('postgres', 'main', 'user', {
  host: ipPath,
  dialect: 'postgres',
  logging: false
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
      id integer PRIMARY KEY,
      title VARCHAR,
      description VARCHAR,
      rating real,
      variations VARCHAR
    );`);
  })
  .then(()=> {
    var pathName = path.resolve(__dirname, '../data.csv');
    console.log(pathName);
    return sequelize.query(`COPY products(id, title, description, rating, variations) FROM '${pathName}' (DELIMITER '|')`);
  })
  .then(() => {
    return console.log('Time to write (min): ', (Date.now() - start) / 60000);
  })
  .catch((err) => {
    console.error('Connection to Postgres products db failed:', err);
  });

module.exports = sequelize;