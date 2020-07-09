const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/products');
// db.on('error', console.error('connection error'));
// db.on('open', function() {
//   console.log('Successfully connected');
// })

module.exports = db;

// const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({
//   contactPoints: ['localhost'],
//   // localDataCenter: 'datacenter1',
//   keyspace: 'ks1'
// });


// var ExpressCassandra = require('express-cassandra');
// var models = ExpressCassandra.createClient({
//     clientOptions: {
//         contactPoints: ['localhost']
//         // protocolOptions: { port: 9042 },
//         // keyspace: 'mykeyspace',
//         // queryOptions: {consistency: ExpressCassandra.consistencies.one}
//     }
//     // ormOptions: {
//     //     defaultReplicationStrategy : {
//     //         class: 'SimpleStrategy',
//     //         replication_factor: 1
//     //     },
//     //     migration: 'safe',
//     // }
// });

// var MyModel = models.loadSchema('Products', {
//   fields: {
//     id: "int",
//     title: "text",
//     description: "text",
//     rating: "int",
//     variations: [
//         {color: "text",
//         images: [{src: "text"}],
//         cost: "int"}
//       ]
//     },
//     key:["product"]
// });

// // MyModel or models.instance.Products can now be used as the model instance
// console.log(models.instance.Products === MyModel);

// // sync the schema definition with the cassandra database table
// // if the schema has not changed, the callback will fire immediately
// // otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
// MyModel.syncDB(function(err, result) {
//     if (err) throw err;
//     // result == true if any database schema was updated
//     // result == false if no schema change was detected in your models
// });