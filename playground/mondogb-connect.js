// loading the library and connecting to database

//pull somthing out of the library
//use mongo server to connect to mongo server

//const MongoClient = require('mongodb').MongoClient;

// //object destructoring - lets you pull out properties from object into variables
// var user = {name: 'abhishek', age: 25};
// var {name} = user;
// console.log(name);

//so we can now use destructoring
//const {MongoClient} = require('mongodb');

// //we can pull more properties
// const {MongoClient, ObjectID} = require('mongodb');
//
// //using that ObjectID and create a new instance
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MongoDB server');


  const db = client.db('TodoApp')

  //insert collections in database
  // db.collection('Todos').insertOne({
  //   test: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });




  // //Insert new doc into Users collection(name, age, location)
  // db.collection('Users').insertOne({
  //   //we can also give our own id
  //   //_id: 123,
  //   name: 'abhishek',
  //   age: 24,
  //   location: 'san jose'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert to users', err);
  //   }
  //   //result.ops consist of all documents that got inserted
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //
  //
  //   //breking the _id given by MongoDB
  //   console.log(result.ops[0]._id.getTimestamp());
  //   //this will output the timestamp of when the id is made
  // })
  //
  //












  //close the database connection
  client.close();
});
//two arrgument - url of the database (in this case it is localhost by default the database is test but we are using TodoApp) , callback function (err, db)
