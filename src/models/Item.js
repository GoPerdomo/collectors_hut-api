const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: "http://res.cloudinary.com/goperdomo/image/upload/v1523835658/Collectors%20Hut/Assets/logo-vertical.png"
  },
  description: {
    type: String,
  },
  productionYear: {
    type: Number,
  },
  acquisitionYear: {
    type: Number,
  },
  origin: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  condition: {
    type: String,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
