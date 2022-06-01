const mongoose = require("mongoose");

const couponModel = mongoose.Schema({
  code: { type: String, require: true },
  description: { type: String },
  expiresAt: { type: Date },
  discount: { type: number },
});

module.exports = mongoose.model("Coupon", couponModel);
