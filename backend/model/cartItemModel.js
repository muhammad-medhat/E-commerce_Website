const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Product",
  },
  name: { type: String },
  totalPrice: { type: Number, require: true },
  quantity: { type: Number, require: true },
  image: { type: String },
  daysTillDelivery: { type: Number, require: true },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
