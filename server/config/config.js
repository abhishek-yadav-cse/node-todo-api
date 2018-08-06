//setting up local env variable
var env = process.env.NODE_ENV || 'development';
//NODE_ENV is a env variable present in heroku
//to create a NODE_ENV env varibale we will tweak the test script in package.json

//console.log('env ********', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoApp';
}
