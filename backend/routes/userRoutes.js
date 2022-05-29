const express = require("express");
const router = express.Router();
const {
  updateUser,
  regUser,
  getUser,
  logoutUser,
  loginUser,
} = require("../controllers/userController");
const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/", regUser);
router.get("/user", verifyAuth, getUser);
router.put("/:id", updateUser);
router.get("/logout", logoutUser);
router.post("/login", loginUser);

module.exports = router;
