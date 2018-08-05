const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Todo.remove({}) - remove everything
//
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//other ways to remove document
//Todo.findOneAndRemove() return doc
// Todo.findOneAndRemove({_id: '5b6764887c6ace5c1e5cf045'}).then((done) => {
//
// });

//Todo.findIdAndRemove
Todo.findByIdAndRemove('5b6764887c6ace5c1e5cf045').then((todo) => {
  console.log(todo);
});

//return doc
