const bcrypt = require('bcrypt');

// Checks if the user id stored in the token equals to the one in the params
const userAuthorization = (req, res, next) => {
  if (req.user._id === req.params.userId) {
    return next();
  } else {
    err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
};

// Hash password before saving to database
const hashPassword = (next, user, err) => {
  if (!user.password) return next();
  
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  })
};

module.exports = {
  userAuthorization,
  hashPassword
};
