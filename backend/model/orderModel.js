const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "in review", "in progress", "on the way", "delivered"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "User",
    },
    orderDetails: { type: String },
    archived: { type: Boolean, default: false },
    total: { type: Number, default: 0.0 },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
