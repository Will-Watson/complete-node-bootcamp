const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    require: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Input must be a valid email.'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password must have atleast 8 characters.'],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
