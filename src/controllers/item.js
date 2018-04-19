const aws = require('aws-sdk');
aws.config.region = 'eu-central-1';

const User = require('../models/User');
const Item = require('../models/Item');

// Config Vars
const S3_BUCKET = process.env.S3_BUCKET;

// Connects to AWS S3
const s3 = new aws.S3();

// Adds a new item to the selected collection
const addItem = (req, res, next) => {
  const { userId, collectionId } = req.params;
  const {
    name,
    description,
    productionYear,
    acquisitionYear,
    origin,
    manufacturer,
    condition,
    photoType,
  } = req.body;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `${userId}-${Date.now()}`,
    ContentType: photoType,
    Expires: 60,
    ACL: 'public-read',
  };

  const photo = photoType ? `https://s3.${aws.config.region}.amazonaws.com/${S3_BUCKET}/${s3Params.Key}` : undefined;

  const newItem = new Item({
    collectionId,
    name,
    description,
    productionYear,
    acquisitionYear,
    origin,
    manufacturer,
    condition,
    photo,
  });

  User.findById(userId, (err, user) => {
    if (err) {
      err = new Error("User not found");
      err.status = 404;
      return next(err);
    } else {
      newItem.save((err) => {
        if (err) {
          err.status = 400;
          next(err);
        } else {
          const signedUrl = photoType ? s3.getSignedUrl('putObject', s3Params) : null;
          res.status(200).json({ item: newItem, signedUrl });
        }
      });
    }
  });
};
// Adds a new item to the selected collection

// Updates item and saves it
const updateItem = (req, res, next) => {
  const { userId } = req.params;
  const {
    name,
    description,
    productionYear,
    acquisitionYear,
    origin,
    manufacturer,
    condition,
    photoType,
  } = req.body;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `${userId}-${Date.now()}`,
    ContentType: photoType,
    Expires: 60,
    ACL: 'public-read',
  };

  Item.findById(req.params.itemId, (err, item) => {
    if (err) return next(err);
    if (!item) return next();

    const prevPhoto = item.photo.slice(item.photo.indexOf(userId));

    item.name = name || item.name;
    item.description = description || item.description;
    item.photo = photoType ? `https://s3.${aws.config.region}.amazonaws.com/${S3_BUCKET}/${s3Params.Key}` : item.photo;
    item.productionYear = productionYear || item.productionYear;
    item.acquisitionYear = acquisitionYear || item.acquisitionYear;
    item.origin = origin || item.origin;
    item.manufacturer = manufacturer || item.manufacturer;
    item.condition = condition || item.condition;

    item.save((err) => {
      if (err) {
        err.status = 400;
        next(err);
      } else {
        const signedUrl = photoType ? s3.getSignedUrl('putObject', s3Params) : null;

        if (signedUrl) {
          s3.deleteObject({ Bucket: S3_BUCKET, Key: prevPhoto }, (err, data) => data);
        }

        res.status(200).json({ item, signedUrl });
      }
    });
  });
};
// Updates item and saves it

// Removes item from the DB
const deleteItem = (req, res, next) => {
  Item.findByIdAndRemove(req.params.itemId, (err, item) => {
    if (err) {
      err = new Error("Item not found");
      err.status = 404;
      return next(err);
    } else {
      const { userId } = req.params;
      const prevPhoto = item.photo.slice(item.photo.indexOf(userId));

      s3.deleteObject({ Bucket: S3_BUCKET, Key: prevPhoto }, (err, data) => data);
      res.status(200).json({});
    }
  });
};
// Removes item from the DB


module.exports = {
  addItem,
  updateItem,
  deleteItem
};
