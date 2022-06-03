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
    orderDetails: { type: String },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
