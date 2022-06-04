const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
} = require("../controllers/cartContoller");
const { verifyAuth } = require("../middleware/authMiddleware");

router.get("/", verifyAuth, getCartItems);
router.put("/add", verifyAuth, addItemToCart);
router.put("/remove", verifyAuth, removeItemFromCart);

module.exports = router;
