const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Brand", brandSchema);
