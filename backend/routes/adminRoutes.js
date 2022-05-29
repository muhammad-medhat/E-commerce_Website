const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  updateUserPassword,
} = require("../controllers/adminController");
//const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);
router.get("/users/all", getAllUsers);
router.post("/users/password", updateUserPassword);
module.exports = router;
