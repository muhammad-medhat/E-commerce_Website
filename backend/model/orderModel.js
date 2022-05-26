const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  status: { type: String, default: "pending" },
  orderId: { type: String, require: true, unique: true },
  userId: { type: String, require: true, unique: true },
  orderDetails: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
