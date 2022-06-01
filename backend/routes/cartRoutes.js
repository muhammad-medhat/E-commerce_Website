const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  removeItemFromCart,
} = require("../controllers/cartContoller");
const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/add", verifyAuth, addItemToCart);
router.put("/remove", verifyAuth, removeItemFromCart);

module.exports = router;
