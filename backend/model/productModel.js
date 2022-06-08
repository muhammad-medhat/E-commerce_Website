const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  description: { type: String },
  images: { type: Array, require: true, default: [] },
  mainImage: { type: String, require: true },
  price: { type: Number, require: true, min: 0.1 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Category",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Brand",
  },
  quantityInStock: { type: Number, require: true },
  daysTillDelivery: { type: Number, require: true },
});

module.exports = mongoose.model("Product", productSchema);
