const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp')

  //fetching the collections
  //db.collection('Todos').find()
  //find return a cursor that points to the document


  // //instead of returnign the pointer we can convert it into array
  // db.collection('Todos').find().toArray().then((docs) => {
  //
  // //we can also find using particular property
  // //db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //
  // //db.collection('Todos').find({
  // //   _id: new ObjectID('5b65f22c1b2bf82f67a58620')
  // // }).toArray().then((docs) => {
  //
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //     console.log('Unable to fetch todos', err);
  //
  // });


  // //To count the number of collections in todos
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });



  //write a code which will return a collectio and count of that collection having particular name
  db.collection('Users').find({name: 'nitesh'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch users', err);
  });

  //client.close();
});
