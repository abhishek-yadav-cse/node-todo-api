//load mongoose
var mongoose = require('mongoose');


//using built in promise library from mongoose
mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect('mongodb://localhost:27017/TodoApp');

// 
// module.exports = {
//   mongoose: mongoose
// };
module.exports = {mongoose};