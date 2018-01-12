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
    default: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/26195994_1683728821665390_2055593716814449098_n.jpg?oh=21be367da8c02511baad09b6cc40755f&oe=5AEFF4CA"
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
