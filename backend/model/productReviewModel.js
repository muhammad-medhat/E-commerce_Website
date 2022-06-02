const mongoose = require("mongoose");

const productReviewSchema = mongoose.Schema(
  {
    stars: { type: Number, min: 0, max: 5 },
    comment: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", productReviewSchema);
