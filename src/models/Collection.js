const mongoose = require('mongoose');

const Collection = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
    default: ""
  }
});

module.exports = Collection;
