require('./config/config.js');

//using lodash to create update route
const _ = require('lodash');

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


const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');



var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;


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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});



// GET /todos/12345
app.get('/todos/:id', (req, res) => {
  //req.params
  var id = req.params.id;

  //valid id using isValid
  if (!ObjectID.isValid(id)) {
       // 404 -  send back empty body
    return res.status(404).send();
  }

//creating query
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  // findById
   // success
    // if todo - send it back
    // if no todo - send back 404 with empty body
    //error
     // 400 - and send empty body back
});



//creating a delete route
app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;


  //validate the id  -> not valid? return 404
  if (!ObjectID.isValid(id)) {
       // 404 -  send back empty body
    return res.status(404).send();
  }

  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
    //success
      //if no doc, send 404
      //if doc, send doc back with 200
    //error
      //404 with empty body
});




//creating the UPDATE route
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  //creating a body variable having subset of things user pass to us
  //we dont user to update everything, in our case we only want user to update text and completed field
  var body = _.pick(req.body, ['text', 'completed']);


  if (!ObjectID.isValid(id)) {
       // 404 -  send back empty body
    return res.status(404).send();
  }

  //updating the completedAt property
  //check the user changing the completed todo and adding a timestamp
  if (_.isBoolean(body.completed) && body.completed) {
    //
    body.completedAt = new Date().getTime();
  } else {
    //
    body.completed = false;
    body.completedAt = null;
  }

  //querry to actually update the database
  //we will use a similar method like findOneAndUpdate

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});





//WORKING WITH users

//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);


  user.save().then(() => {
    //res.send(user);
    return user.generateAuthToken();
  }).then((token) => {
    //res.send(user);

    //sending the token back as http response header
    res.header('x-auth', token).send(user);

    //header with x means custom header
  }).catch((e) => {
    res.status(400).send(e);
  })
});


// //defining a middleware which can use /users/me route in all other routes
// var authenticate = (req, res, next) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user) => {
//     if (!user) {
//       //res.status(401).send();
//       return Promise.reject();
//     }
//
//     res.user = user;
//     req.token = token;
//     next();
//   }).catch((e) => {
//     //authentication error
//     res.status(401).send();
//   });
// };

//it can be placed inside its own file


//route associate to particular user - private route
//first we will use normal methods then we will use express middleware for that
// app.get('/users/me', (req, res) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user) => {
//     if (!user) {
//       //res.status(401).send();
//       return Promise.reject();
//     }
//
//     res.send(user);
//   }).catch((e) => {
//     //authentication error
//     res.status(401).send();
//   });
// });

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
