const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true // Ensures each promo code is unique
  },
  discount: {
    type: Number,
    required: true
  }
});

const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;
