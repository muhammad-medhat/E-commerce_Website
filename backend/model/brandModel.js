const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: String,
  producId: { type: String, require: true },
});

module.exports = mongoose.model("Brand", brandSchema);
