const fs = require('fs');
const path = require('path');
const cassandra = require('cassandra-driver');
const authProvider = new cassandra.auth.PlainTextAuthProvider('main', 'user');

var contactPoints = ['18.221.79.58'];
const client = new cassandra.Client({
  contactPoints: contactPoints,
  localDataCenter: 'datacenter1',
  authProvider: authProvider
});

var start = Date.now();
var pathName = '../data.csv';
console.log(pathName);


// Execute the queries
// Below is commented out to avoid linter errors
// var q1 = `DROP KEYSPACE IF EXISTS products`;
// var q2 = `CREATE KEYSPACE products WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND DURABLE_WRITES = 'true'`;
// var q3 = `USE products`;
// var q4 = `CREATE TABLE products (id int PRIMARY KEY,title text,description text,rating float,variations text)`;
// var q5 = `COPY products.products (id,title,description,rating,variations) FROM '${pathName}' `;

client.execute(q1)
  .then(() => {
    return client.execute(q2);
  })
  .then(() => {
    return client.execute(q3);
  })
  .then(() => {
    return client.execute(q4);
  })
  .then(() => {
    return console.log('Start time: ', start);
  })
  .catch((err) => {
    console.error('Connection to Cassandra products db failed:', err);
  });