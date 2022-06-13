const mongoose = require("mongoose");

const productMSchema = mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  images: { type: Array, require: true },
  thumbnail: {type: String, require: true},
  price: { type: Number, require: true },
  category: { type: String },
  brand: { type: String},
  quantityInStock: { type: Number, require: true },
});

module.exports = mongoose.model("ProductM", productMSchema);
