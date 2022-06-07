const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVATED", "SUSPENDED"],
      require: true,
      default: "ACTIVE",
    },
    age: { type: Number },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
