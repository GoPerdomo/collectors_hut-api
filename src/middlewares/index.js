const config = require('../config/config');

// Checks if the user id stored in the token equals to the one in the params
const userAuthorization = (req, res, next) => {
  if (req.user._id === req.params.userId) {
    next();
  } else {
    err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
}
// Checks if the user id stored in the token equals to the one in the params

module.exports = userAuthorization;
