const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema(
  {
    email: { type: String, require: true },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
