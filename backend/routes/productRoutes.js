const express = require("express");
const router = express.Router();
const {
  updateProduct,
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  getCats,
  getBrands,
} = require("../controllers/productController");

/**
 * @desc testing get categories, brands
 *   @route GET api/products/cats
 *   @route GET api/products/brands
 *   @access  Public

 */
router.get("/cats", getCats);
router.get("/brands", getBrands);

/**
 * @Desc get all Products
 * @route GET api/products/
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @Desc Select single Product
 * @route GET api/products/:id
 * @access  Public
 */
router.get("/:id", getProduct);

/**
 * The folowing Routes are specific to the admin
 * - must be moved to adminRoutes.js
 */

/**
 * @Desc Create Product
 * @route POST api/products /
 * * @access  Private
 */
router.post("/", createProduct);

/**
 * @Desc Update Product
 * @route PUT api/products/:id
 * @access  Private
 */
router.put("/:id", updateProduct);

/**
 * @Desc Delete Product
 * @route DELETE api/products/:id
 * @access  Private
 */
router.delete("/:id", deleteProduct);

module.exports = router;
