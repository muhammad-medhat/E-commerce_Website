const express = require("express");
const router = express.Router();
const { addItemToCart } = require("../controllers/cartContoller");
const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/add", verifyAuth, addItemToCart);

module.exports = router;
