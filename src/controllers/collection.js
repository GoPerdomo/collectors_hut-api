const User = require('../models/User');
const Item = require('../models/Item');


// Fetches all users from the DB and sends only the collections
const getAllCollections = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      err = new Error("Collections not found"); // TODO: Refactor error
      err.status = 404;
      return next(err);
    } else {
      const collections = [];
      for (user of users) {
        for (collection of user.collections) {
          collections.push({ userId: user._id, collection });
        }
      }
      res.status(200).json(collections);
    }
  });
};
// Fetches all users from the DB and sends only the collections

// Creates a new collection and assigns it to the user
const createCollection = (req, res, next) => {
  const { userId, collectionId } = req.params;
  const { name, info } = req.body;

  User.findById(userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      user.collections.push({ name, info });
      user.save((err) => {
        if (err) {
          err.status = 400;
          return next(err);
        } else {
          let selectedCollection = user.collections[user.collections.length - 1];
          Item.find({ collectionId }, (err, items) => {
            selectedCollection = selectedCollection.toObject();
            selectedCollection.items = items;
            res.status(200).json(selectedCollection);
          });
        }
      });
    }
  });
};
// Creates a new collection and assigns it to the user

// Finds user and updates the selected collection
const updateCollection = (req, res, next) => {
  const { userId, collectionId } = req.params;
  const { name, info } = req.body;

  User.findById(userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      const selectedCollection = user.collections.find(collection => collection._id == collectionId);
      if (!selectedCollection) {
        err = new Error("Collection not found");
        err.status = 404;
        return next(err);
      } else {
        selectedCollection.name = name || selectedCollection.name;
        selectedCollection.info = info || selectedCollection.info;
        user.save((err) => {
          if (err) {
            err.status = 400;
            next(err);
          }
          res.status(200).json(selectedCollection);
        });
      }
    }
  });
};
// Finds user and updates the selected collection

// Finds user and deletes selected collection
const deleteCollection = (req, res, next) => {
  const { userId, collectionId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      user.collections.pull({ _id: collectionId });
      user.save((err) => {
        if (err) {
          err.status = 400;
          next(err);
        } else {
          Item.find({ collectionId }, (err, items) => {
            for (const item of items) {
              Item.findByIdAndRemove(item._id, (err, deletedItem) => {
                if (err) {
                  err.status = 400;
                  next(err);
                }
              });
            }
          })
          res.status(200).json({});
        }
      });
    }
  });
};
// Finds user and deletes selected collection


module.exports = {
  getAllCollections,
  createCollection,
  updateCollection,
  deleteCollection
};
