const express = require("express");
const router = express.Router();
const {
  countActiveAndDeactivatedUsers,
  countNewUsers,
  countOrdersToday,
  numberOfOrders,
  incomeThisWeek,
} = require("../controllers/statisticsController");

const { verifyAdmin } = require("../middleware/authMiddleware");

router.get("/active-users", verifyAdmin, countActiveAndDeactivatedUsers);
router.get("/new-users", verifyAdmin, countNewUsers);
router.get("/orders-today", verifyAdmin, countOrdersToday);
router.get("/all-orders", verifyAdmin, numberOfOrders);
router.get("/income-this-week", verifyAdmin, incomeThisWeek);

module.exports = router;
