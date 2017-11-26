const mongoose = require('mongoose');

const newCollection = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: []
  }
});

const Collection = mongoose.model('Collection', newCollection);

module.exports = Collection;
