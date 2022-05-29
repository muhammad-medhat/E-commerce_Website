const express = require("express");
const router = express.Router();
const {
  updateUser,
  regUser,
  getUser,
  logoutUser,
} = require("../controllers/userController");
const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/", regUser);
router.get("/user", verifyAuth, getUser);
router.put("/:id", updateUser);
router.get("/logout", logoutUser);

module.exports = router;
