const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp')


  // //deletMany() - delete all the todo object having some text field
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });


  // //deleteOne() - delete only one of the object having some text field
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });


  // //findOneAndDelete() - delete the object and return its value
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //working on users

  //removing duplicate users
  db.collection('Users').deleteMany({name: 'abhishek'});


  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5b65f4552e51a12f70349a0b")
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });





  //client.close();
});
