const express = require("express");
const router = express.Router();
const {
  countActiveAndDeactivatedUsers,
  countNewUsers,
  countOrdersToday,
} = require("../controllers/statisticsController");

router.get("/active-users", countActiveAndDeactivatedUsers);
router.get("/new-users", countNewUsers);
router.get("/orders-today", countOrdersToday);

module.exports = router;
