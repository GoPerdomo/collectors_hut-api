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
  const newName = req.body.name;
  const newDescription = req.body.description;
  const newPhoto = req.body.photo;
  const newProductionYear = req.body.productionYear;
  const newAcquisitionYear = req.body.acquisitionYear;
  const newOrigin = req.body.origin;
  const newManufacturer = req.body.manufacturer;
  const newCondition = req.body.condition;
  
  Item.findById(req.params.itemId, (err, item) => {
    if(err) return next(err);
    if(!item) return next();
    item.name = newName || item.name;
    item.description = newDescription || item.description;
    item.photo = newPhoto || item.photo;
    item.productionYear = newProductionYear || item.productionYear;
    item.acquisitionYear = newAcquisitionYear || item.acquisitionYear;
    item.origin = newOrigin || item.origin;
    item.manufacturer = newManufacturer || item.manufacturer;
    item.condition = newCondition || item.condition;
    
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
