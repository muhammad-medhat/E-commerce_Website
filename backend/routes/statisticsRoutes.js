const express = require("express");
const router = express.Router();
const {
  countActiveAndDeactivatedUsers,
  countNewUsers,
  countOrdersToday,
  numberOfOrders,
  incomeThisWeek,
} = require("../controllers/statisticsController");

router.get("/active-users", countActiveAndDeactivatedUsers);
router.get("/new-users", countNewUsers);
router.get("/orders-today", countOrdersToday);
router.get("/all-orders", numberOfOrders);
router.get("/income-this-week", incomeThisWeek);

module.exports = router;
