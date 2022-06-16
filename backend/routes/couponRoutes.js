const express = require("express");
const router = express.Router();
const { createCoupon, viewCoupon, delCoupon } = require("../controllers/couponController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, createCoupon);
router.get("/", verifyAdmin, viewCoupon);
router.delete("/", verifyAdmin, delCoupon);
module.exports = router;
