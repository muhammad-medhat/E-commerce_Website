const express = require("express");
const router = express.Router();
const {
  createCategory,
  viewCategory,
  deleteCategory,
  updateCategory
} = require("../controllers/categoryController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyAdmin, createCategory);
router.get("/view", verifyAdmin, viewCategory);
router.delete("/delete/:id", verifyAdmin, deleteCategory);
router.put("/update/:id", verifyAdmin, updateCategory);

module.exports = router;
