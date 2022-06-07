const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Category", categorySchema);
