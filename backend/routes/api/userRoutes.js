const express = require("express");
const router = express.Router();
const {
  updateUser,
  regUser,
  getUser,
  logoutUser,
  loginUser,
} = require("../../controllers/userController");
const { verifyAuth } = require("../../middleware/authMiddleware");

router.post("/register", regUser);
router.get("/", verifyAuth, getUser);
router.put("/", verifyAuth, updateUser);
router.get("/logout", verifyAuth, logoutUser);
router.post("/login", loginUser);

module.exports = router;
