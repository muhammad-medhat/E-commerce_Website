const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  code: { type: String, require: true },
  description: { type: String },
  expiresAt: { type: Date },
  discount: { type: Number },
  usersUsed: [
    {
      type: Set,
      of: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: new Set(),
    },
  ],
});

module.exports = mongoose.model("Coupon", couponSchema);
