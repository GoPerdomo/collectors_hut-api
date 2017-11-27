const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    type: Array,
    default: []
  }
});

// Authenticates the user
userSchema.statics.authenticates = (email, password, callback) => {
  User.findOne({ email })
  .exec((err, user) => {
    if(err) return callback(err);
    if(!user) {
      const err = new Error("Unauthorized");
      err.status = 401;
      return callback(err);
    }
    
    bcrypt.compare(password, user.password, (err, result) => {
      if(result) return callback(null, user);
      return callback();
    })
  });
}
// Authenticates the user

// Hash the password before saving to the database
userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
});
// Hash the password before saving to the database

const User = mongoose.model('User', userSchema);

module.exports = User;
