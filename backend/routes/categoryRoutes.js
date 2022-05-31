const express = require("express");
const router = express.Router();
const {
  createCategory,
  viewCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, createCategory);
router.get("/",  viewCategory);
router.delete("/:id", verifyAdmin, deleteCategory);
router.put("/:id", verifyAdmin, updateCategory);

module.exports = router;
