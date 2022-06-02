const express = require("express");
const router = express.Router();
const {
  createCategory,
  viewCategory,
  deleteCategory,
  updateCategory,
  getCategoryProducts,
} = require("../controllers/categoryController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, createCategory);
router.get("/",  viewCategory);
router.delete("/:id", verifyAdmin, deleteCategory);
router.put("/:id", verifyAdmin, updateCategory);
router.get("/:id", getCategoryProducts);

module.exports = router;
