const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['sneakers', 'boots', 'sandals', 'loafers', 'heels', 'flats', 'other'],
    default: 'other'
  }
},);

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
