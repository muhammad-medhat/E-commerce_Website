const express = require("express");
const router = express.Router();
const {
  createBrand,
  viewBrands,
  viewBrand,
  deleteBrand,
  updateBrand,
  getBrandProducts,
} = require("../../controllers/brandController");
const { verifyAdmin } = require("../../middleware/authMiddleware");
/**
 * @desc    Create Brand
 * @route   POST /api/brands/
 * @access  Private
 */
router.post("/", verifyAdmin, createBrand);

/**
 * @desc    Get all Brands
 * @route   GET /api/brands/
 * @access  Public
 */
router.get("/", viewBrands);

/**
 * @desc    Delete Brand
 * @route   DELETE /api/brands/:id
 * @access  Private
 */
router.delete("/:id", verifyAdmin, deleteBrand);
/**
 * @desc    update Brand
 * @route   PUT /api/brands/:id
 * @access  Private
 */
router.put("/:id", verifyAdmin, updateBrand);

/**
 * @desc    get a Single Brand
 * @route   GET /api/brands/:id
 * @access  Public
 */
router.get("/:id", viewBrand);

/**
 * @desc    get Brand Products
 * @route   GET /api/brands/:id/products/
 * @access  Public
 */
router.get("/:id/products", getBrandProducts);

module.exports = router;
