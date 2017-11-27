const mongoose = require('mongoose');

const Collection = mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = Collection;
