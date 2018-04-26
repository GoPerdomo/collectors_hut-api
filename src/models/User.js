const mongoose = require('mongoose');

const hashPassword = require('../middlewares').hashPassword;

const Collection = require('./Collection');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  photo: {
    type: String,
    default: "http://res.cloudinary.com/goperdomo/image/upload/v1524761916/Collectors%20Hut/Assets/user.png"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  collections: {
    type: [Collection],
    default: []
  }
});

userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
