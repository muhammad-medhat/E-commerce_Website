const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Brand", brandSchema);
