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