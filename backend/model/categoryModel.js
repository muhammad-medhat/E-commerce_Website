const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  id: { type: String, require: true },
});

module.exports = mongoose.model("Category", categorySchema);
