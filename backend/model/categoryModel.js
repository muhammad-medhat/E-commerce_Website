const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  image: { type: String, require: true },
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Category", categorySchema);
