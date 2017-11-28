const User = require('../models/User');
const Item = require('../models/Item');

// TODO: Refactor !

// Fetches all users from the DB and sends only the collections
const getAllCollections = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) {
      err = new Error("Collections not found"); // TODO: Refactor error
      err.status = 404;
      return next(err);
    } else {
      const collections = [];
      for(user of users) {
        for(collection of user.collections) {
          collections.push(collection);
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
    if(err) {
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
  User.findById(req.params.userId, (err, user) => {
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      const selectedCollection = user.collections.find(collection => collection._id == req.params.collectionId).toObject();
      if(!selectedCollection) {
        err = new Error("Collection not found");
        err.status = 404;
        return next(err);
      } else {
        Item.find({ collectionId: req.params.collectionId }, (err, items) => {
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
          return next(err);
        } else {
          res.status(200).json(user);
        }
      });
    }
  });

};
// Creates a new collection and assigns it to the user

// Finds user and updates the selected collection
const updateCollection = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      const selectedCollection = user.collections.find(collection => collection._id == req.params.collectionId);
      if(!selectedCollection) {
        err = new Error("Collection not found");
        err.status = 404;
        return next(err);
      } else {
        selectedCollection.name = req.body.name;
        user.save((err) => {
          if(err) {
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
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      user.collections.pull({ _id: req.params.collectionId });
      user.save((err) => {
        if(err) {
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
