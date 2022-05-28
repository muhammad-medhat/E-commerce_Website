const express = require("express");
const router = express.Router();
const {
  updateUser,
  regUser,
  getUser,
} = require("../controllers/userController");
const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/", regUser);
router.get("/user", verifyAuth, getUser);
router.put("/:id", updateUser);

module.exports = router;
