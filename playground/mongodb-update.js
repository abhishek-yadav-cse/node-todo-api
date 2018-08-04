const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp')

  //findOneUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b660a9e312e7bbe5778a9e5')
  // }, {
  //   //mondodb update operator
  //   //we will be using set operator
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //     returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b65f3e32749132f6cf3688e')
  }, {
    $set: {
      name: 'abhishek'
    },
    $inc: {
      age: 1
    }
  }, {
      returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //client.close();
});
