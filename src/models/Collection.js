const mongoose = require('mongoose');

const Collection = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  info: {
    type: String,
    default: "",
    maxlength: 1500,
  }
});

module.exports = Collection;
