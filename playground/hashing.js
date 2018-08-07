//playing around with basic hash function sha256
//to use install crypto-js module

const {SHA256} =  require('crypto-js');

// //to hash any value just pass it to SHA256 function
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
// //to see how we can verify the data we get from server
// var data = {
//   id: 4
// };
//
// var token = {
//   //data: data
//   //or we can simply write data from ES6
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // //lets try to change token and check our validation function
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// //this is what hackers will be trying to do
//
// //validate the token has not been manipulated
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if ( resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }


//this whole process is called json web token.... it will automatically do everything for us
//install jsonwebtoken

const jwt = require('jsonwebtoken');

//AGain we will follow two steps -
//two function
  //jwt.sign - takes the object (data with user id) takes and create tokens
  //jwt.verify - verify the token

  var data = {
    id: 10
  };

  var token = jwt.sign(data, '123abc');
  console.log(token);


  var decoded = jwt.verify(token, '123abc');
  console.log('Decoded:', decoded);
