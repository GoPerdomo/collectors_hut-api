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

// Gets all the collections from a user
// TODO: Populate with items
const getUserCollections = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json(user.collections);
    }
  });
};
// Gets all the collections from a user

// Gets a collection from a user
const getCollection = (req, res, next) => {
  const { collectionId } = req.params;

  User.findById(req.params.userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      let selectedCollection = user.collections.find(collection => collection._id == collectionId);
      if (!selectedCollection) {
        err = new Error("Collection not found");
        err.status = 404;
        return next(err);
      } else {
        Item.find({ collectionId }, (err, items) => {
          selectedCollection = selectedCollection.toObject();
          selectedCollection.items = items;
          res.status(200).json(selectedCollection);
        });
      }
    }
  });
};
// Gets a collection from a user


// Creates a new collection and assigns it to the user
const createCollection = (req, res, next) => {
  const { name, info } = req.body;

  User.findById(req.params.userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      user.collections.push({ name, info });
      const newCollection = user.collections[user.collections.length - 1];
      user.save((err) => {
        if (err) {
          err.status = 400;
          return next(err);
        } else {
          User.find()
          res.status(200).json(newCollection);
        }
      });
    }
  });

};
// Creates a new collection and assigns it to the user

// Finds user and updates the selected collection
const updateCollection = (req, res, next) => {
  const { collectionId } = req.params;
  const { name, info } = req.body;

  User.findById(req.params.userId, (err, user) => {
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
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      user.collections.pull({ _id: req.params.collectionId });
      user.save((err) => {
        if (err) {
          err.status = 400;
          next(err);
        }
        res.status(200).json({ message: "Collection deleted" });
      });
    }
  });
};
// Finds user and deletes selected collection


module.exports = {
  getAllCollections,
  getUserCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection
};
