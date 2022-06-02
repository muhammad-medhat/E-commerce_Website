const express = require("express");
const router = express.Router();
const { createCoupon, viewCoupon, getCoupon } = require("../controllers/couponController");
const { verifyAdmin, verifyAuth } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, createCoupon);
router.get("/", verifyAdmin, viewCoupon);
router.get("/:id", verifyAuth, getCoupon);

module.exports = router;