const mongoose = require('mongoose');

const Collection = mongoose.Schema({
  name: {
    type: String
  },
  items: {
    type: Array,
    default: []
  }
});

module.exports = Collection;
