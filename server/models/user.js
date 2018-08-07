const mongoose = require('mongoose');
//for email validating
const validator = require('validator');


// {
//   email: 'abc@xyz.com',
//   password: 'asdasdae2354235',
//   tokens: [{
//     access: 'auth',
//     token: 'haotr0128491'
//   }]
// }


// var User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type:String,
//     trim: true,
//     minlength: 1,
//     required: true,
//     unique: true //two documents in the collectio wont be same
//     //validating email - for validator it will take lot of test cases
//     //instead of that we will use custom validator, npm validator
//
//   //   validate: (value) => {
//   //     return validator.isEmail(value);
//   //   },
//   //   message: `{vale} is not valid email`
//   // }
//   //in simple way we can also write it as
//   validate: {
//     validator: validator.isEmail,
//     message: '{VALUE} is not a valid email'
//   }
// },
//  password: {
//    type: String,
//    require: true,
//    minlength: 6
//  },
//  //tokens is an array only available in mongodb not in sql
//  tokens: [{
//    access: {
//      type: String,
//      require: true
//    },
//    token: {
//      type: String,
//      required: true
//    }
//  }]
//
// });



var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {User};
