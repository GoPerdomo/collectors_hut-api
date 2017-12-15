const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Collection = require('./Collection');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: "http://www.atwoodz.com/wp-content/uploads/2013/08/question-mark.jpe"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  collections: {
    type: [Collection],
    default: []
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
