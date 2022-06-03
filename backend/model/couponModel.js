const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  code: { type: String, require: true },
  description: { type: String },
  expiresAt: { type: Date },
  discount: { type: Number },
});

module.exports = mongoose.model("Coupon", couponSchema);
