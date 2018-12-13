const mongoose = require('mongoose');
//for email validating
const validator = require('validator');

const jwt = require('jsonwebtoken');

const _ = require('lodash');

//schema to store user schema
var UserSchema = new mongoose.Schema({
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

//to return only certain values from the json output
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;

  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  // user.tokens.push({
  //   access,
  //   token
  // })
  user.tokens = user.tokens.concat([{access, token}]);

  // user.save().then(() => {
  //   return token;
  // }).then((token) => {
  //
  // })

 return user.save().then(() => {
    return token;
  });

};
//here we havent used arrow function but here since we dealing with particular user
//therefore we will be having this so we have to use function()



UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  //jwt.verify() will throw some error

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {

    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
