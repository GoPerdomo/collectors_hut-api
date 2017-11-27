const User = require('../models/User');
const Collection = require('../models/Collection');

// const getCollection = (req, res, next) => {};


// Creates a new collection and assigns it to the user
const createCollection = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      user.collections.push({
        name: req.body.name
      });
      user.save((err) => {
        if(err) {
          err.status = 400;
          next(err);
        }
        res.status(200).json(user);
      });
    }
  });

};
// Creates a new collection and assigns it to the user

// const updateCollection = (req, res, next) => {};
// const deleteCollection = (req, res, next) => {};

module.exports = {
  createCollection,
};
