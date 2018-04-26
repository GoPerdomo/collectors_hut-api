const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  photo: {
    type: String,
    default: "http://res.cloudinary.com/goperdomo/image/upload/v1523835658/Collectors%20Hut/Assets/logo-vertical.png"
  },
  description: {
    type: String,
    maxlength: 1500,
  },
  productionYear: {
    type: Number,
    max: 9999,
  },
  acquisitionYear: {
    type: Number,
    max: 9999,
  },
  origin: {
    type: String,
    maxlength: 100,
  },
  manufacturer: {
    type: String,
    maxlength: 100,
  },
  condition: {
    type: String,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
