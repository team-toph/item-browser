const Sequelize = require('sequelize');

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
  .catch((err) => {
    console.error('Connection to Postgres products db failed:', err);
  });

module.exports = sequelize;
