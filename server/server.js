//pulling off mongoose property through es6 destructuring
var {mongoose} = require('./db/mongoose');

// //save new something
// //behing the scene even though the connection is not made as it will take few miliseconds
// //till that time mongoose will take care of the next line excecution
//
// //mongoose keep it a little organised as compared to mongo we used earlier
// //defining the database schema
// // var Todo = mongoose.model('Todo', {
// //   text: {
// //     type: String,
// //     required: true,
// //     minlength: 1,
// //     trim: true //remove all leading and trailing spaces
// //   },
// //   completed: {
// //     type: Boolean,
// //     default: false
// //   },
// //   completedAt: {
// //     type: Number,
// //     default: null
// //   }
// // });
//
// // var newTodo = new Todo({
// //   text: 'Cook dinner'
// // });
// //
// // newTodo.save().then((doc) => {
// //   console.log('Saved todo', doc);
// // }, (e) => {
// //   console.log('Unable to save todo')
// // });
//
// // var otherTodo = new Todo({
// //   text: 'Feed the cat',
// //   completed: true,
// //   completedAt: 123
// // });
//
// //If in case we run without any properties for collection
// //It will still add to the database
// //To avoid it, we will use some validator(the value must exist)
// var otherTodo = new Todo({
//   //text: '' //this will also fail due to minlength
//   text: '    edit this video    '  //it will trim and check minlength and since they both pass it will add to database
// });
//
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
//
//
//
//
//
//
// //user model
// //email - requre it - trim it - set type - set min length of 1
// //save it into database
//
// // var User = mongoose.model('User', {
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   email: {
// //     type:String,
// //     trim: true,
// //     minlength: 1,
// //     required: true
// //   }
// // });
//
// var newUser = new User({
//   name: 'abhishek yadav',
//   email: '      abc@xyz.com   '
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });


var express = require('express');
var bodyParser = require('body-parser');


var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET  /todos/123jagsgh

app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = {app};