const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// var id = '5b665cb74ab4df36b42462761';
// //increase 5 to 6 --valid id but not found in database
// //insert 1 at the end -- invalid id as well not found in database
// //ObjectID.isValid
//
// if(!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// };

// Todo.find({
//   _id: id //in mongoose we dont need to make objectID
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id //in mongoose we dont need to make objectID
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));



//User.findById
const {User} = require('./../server/models/user');

User.findById('5b6640f7cdda7f351f3dd655').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
