const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  description: { type: String },
  image: { type: String, require: true },
  price: { type: Number, require: true },
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
});

module.exports = mongoose.model("Product", productSchema);
