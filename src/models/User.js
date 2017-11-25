const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  picture: {
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
    type: Array,
    default: []
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
