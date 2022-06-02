const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  code: { type: String, require: true },
  description: { type: String },
  expiresAt: { type: Date },
  discount: { type: number },
});

module.exports = mongoose.model("Coupon", couponSchema);
