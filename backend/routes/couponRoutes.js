const express = require("express");
const router = express.Router();
const { createCoupon, viewCoupon } = require("../controllers/couponController");
const { verifyAdmin, verifyAuth } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, createCoupon);
router.get("/", verifyAdmin, viewCoupon);

module.exports = router;
