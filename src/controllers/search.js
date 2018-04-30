const User = require('../models/User');


const search = (req, res, next) => {
  const userQuery = req.query.user;
  const collectionQuery = req.query.collection;

  // Search for user
  if (userQuery) {
    const search = new RegExp(userQuery, "i");
    User.find({
      $or: [
        { firstName: search },
        { lastName: search }
      ]
    }, (err, users) => {
      if (err) {
        err = new Error("User not found");
        err.status = 404;
        return next(err);
      } else {
        const results = [];
        for (user of users) {
          results.push({ user })
        }
        res.status(200).json(results);
      }
    });
  }

  // Search for collection
  if (collectionQuery) {
    const search = new RegExp(collectionQuery, "i");

    User.find({ collections: { $elemMatch: { name: search } } }, (err, users) => {
      if (err) {
        err = new Error("User not found");
        err.status = 404;
        return next(err);
      } else {
        const results = [];
        for (user of users) {
          for (collection of user.collections) {
            if (collection.name.toLowerCase().includes(collectionQuery)) {
              results.push({ collection, user });
            }
          }
        }
        res.status(200).json(results);
      }
    });
  }
};

module.exports = search;
