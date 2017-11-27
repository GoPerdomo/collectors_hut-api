const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Test-map-peakp-black.svg/1024px-Test-map-peakp-black.svg.png"
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
