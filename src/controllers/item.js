const User = require('../models/User');
const Item = require('../models/Item');

// TODO: Refactor !

// Get all items from a user
const getAllItems = (req, res, next) => {
  Item.find({}, (err, items) => {
    if(err) {
      err = new Error("Items not found"); // TODO: Refactor error
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json(items);
    }
  })
};
// Get all items from a user

// Get item by id
const getItem = (req, res, next) => {
  Item.findById(req.params.itemId, (err, item) => {
    if(err) {
      err = new Error("Item not found");
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json(item);
    }
  })
};
// Get item by id

// Adds a new item to the selected collection
const addItem = (req, res, next) => {
  const newItem = new Item({
    collectionId: req.params.collectionId,
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    productionYear: req.body.productionYear,
    acquisitionYear: req.body.acquisitionYear,
    origin: req.body.origin,
    manufacturer: req.body.manufacturer,
    condition: req.body.condition,
  });
  
  User.findById(req.params.userId, (err, user) => {
    if(err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      newItem.save((err) => {
        if(err) {
          err.status = 400;
          next(err);
        } else {
          res.status(200).json(newItem);
        }
      });
    }
  });
};
// Adds a new item to the selected collection

// Updates item and saves it
// TODO: Allow to remove infos
const updateItem = (req, res, next) => {
  Item.findById(req.params.itemId, (err, item) => {
    if(err) return next(err);
    if(!item) return next();
    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.photo = req.body.photo || item.photo;
    item.productionYear = req.body.productionYear || item.productionYear;
    item.acquisitionYear = req.body.acquisitionYear || item.acquisitionYear;
    item.origin = req.body.origin || item.origin;
    item.manufacturer = req.body.manufacturer || item.manufacturer;
    item.condition = req.body.condition || item.condition;
    
    item.save((err) => {
      if(err) {
        err.status = 400;
        next(err);
      } else {
        res.status(200).json(item);
      }
    });
  });
};
// Updates item and saves it

// Removes item from the DB
const deleteItem = (req, res, next) => {
  Item.findByIdAndRemove(req.params.itemId, (err, item) => {
    if(err) {
      err = new Error("Item not found");
      err.status = 404;
      return next(err);
    } else {
      res.status(200).json({ message: "Item deleted" });
    }
  });
};
// Removes item from the DB


module.exports = {
  getAllItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
};
