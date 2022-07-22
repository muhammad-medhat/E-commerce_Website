const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
} = require("../../controllers/productReviewController");
const { verifyAuth } = require("../../middleware/authMiddleware");

router.post("/:id/review", verifyAuth, createReview);
router.get("/:id", getReviews);

module.exports = router;
