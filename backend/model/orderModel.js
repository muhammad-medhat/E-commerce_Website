const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    status: { type: String, default: "pending" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "User",
    },
    orderDetails: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
