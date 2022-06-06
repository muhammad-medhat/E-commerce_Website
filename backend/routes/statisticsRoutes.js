const express = require("express");
const router = express.Router();
const {
  countActiveAndDeactivatedUsers,
  countNewUsers,
  countOrdersToday,
  numberOfOrders,
} = require("../controllers/statisticsController");

router.get("/active-users", countActiveAndDeactivatedUsers);
router.get("/new-users", countNewUsers);
router.get("/orders-today", countOrdersToday);
router.get("/all-orders", numberOfOrders);

module.exports = router;
