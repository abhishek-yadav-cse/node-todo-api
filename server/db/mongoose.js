//load mongoose
var mongoose = require('mongoose');


//using built in promise library from mongoose
mongoose.Promise = global.Promise;

//connecting to database
// mongoose.connect('mongodb://localhost:27017/TodoApp');
//connecting to heroku mongodb database
mongoose.connect(process.env.MONGODB_URI);

//
// module.exports = {
//   mongoose: mongoose
// };



//setting env local
//process.env.NODE_ENV === 'test'



module.exports = {mongoose};
