const express = require("express");
const router = express.Router();
const {
  createBrand,
  viewBrands,
  viewBrand,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");
const { verifyAdmin } = require("../middleware/authMiddleware");
/**
 * @desc    Create Brand
 * @route   POST /api/brand/
 * @access  Private
 */
router.post("/", verifyAdmin, createBrand);

/**
 * @desc    Get all Brands
 * @route   GET /api/brand/
 * @access  Public
 */
router.get("/", viewBrands);

/**
 * @desc    Delete Brand
 * @route   DELETE /api/brand/:id
 * @access  Private
 */
router.delete("/:id", verifyAdmin, deleteBrand);
/**
 * @desc    update Brand
 * @route   PUT /api/brand/:id
 * @access  Private
 */
router.put("/:id", verifyAdmin, updateBrand);

/**
 * @desc    get a Single Brand
 * @route   GET /api/brand/:id
 * @access  Public
 */
router.get("/:id", viewBrand);

module.exports = router;
