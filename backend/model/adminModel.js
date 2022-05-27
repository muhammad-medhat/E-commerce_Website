const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true },
});

module.exports = mongoose.model("Admin", adminSchema);
