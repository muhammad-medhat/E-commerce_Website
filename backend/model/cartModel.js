const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  session: { type: String, require: true, unique: true },
  items: { type: Array },
});

module.exports = mongoose.model("Cart", cartSchema);
