const mongoose = require('mongoose');

const newItem = mongoose.Schema({
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
  extraInfo: {
    type: String,
  }
});

const Item = mongoose.model('Item', newItem);

module.exports = Item;
