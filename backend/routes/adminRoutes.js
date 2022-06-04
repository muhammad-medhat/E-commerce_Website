const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  updateUserPassword,
  changeUserStatus,
  getAllOrders,
  getSingleOrder

} = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/logout", verifyAdmin, logoutAdmin);
router.get("/users/", verifyAdmin, getAllUsers);
router.put("/users/password", verifyAdmin, updateUserPassword);
router.put("/users/status", verifyAdmin, changeUserStatus);

/**
 * @desc Get all orders
 * @route GET /api/admin/orders
 * @access Private
 */
router.get("/orders", verifyAdmin, getAllOrders);

/**
 * @desc Get single order
 * @route GET /api/admin/orders/:id
 * @access Private
 */
 router.get("/orders/:id", verifyAdmin, getSingleOrder);

module.exports = router;
