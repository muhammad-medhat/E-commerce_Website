const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  updateUserPassword,
} = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/logout",verifyAdmin, logoutAdmin);
router.get("/users/all", verifyAdmin, getAllUsers);
router.put("/users/password", verifyAdmin, updateUserPassword);
module.exports = router;
