const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    status: { type: String, default: "pending" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "User",
    },
    orderDetails: { type: Array },
    archived: { type: Boolean, default: false },
    total: { type: Number, default: 0.0 },
    shippingAddress: { type: String },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
