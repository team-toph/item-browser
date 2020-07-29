const Sequelize = require('sequelize');

// connect to default
var sequelize = new Sequelize('postgres', 'main', 'user', {
  host: '18.191.85.22',
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
