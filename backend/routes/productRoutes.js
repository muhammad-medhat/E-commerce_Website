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
 */
router.get("/cats", getCats);
router.get("/brands", getBrands);

/**
 * @Desc get all Products
 * @route GET api/products/
 */
router.get("/", getAllProducts);

/**
 * @Desc Select single Product
 * @route GET api/products/:id
 */
router.get("/:id", getProduct);

/**
 * The folowing Routes are specific to the admin
 * - must be moved to adminRoutes.js
 */

/**
 * @Desc Create Product
 * @route POST api/products /
 */
router.post("/", createProduct);

/**
 * @Desc Update Product
 * @route PUT api/products/:id
 */
router.put("/:id", updateProduct);

/**
 * @Desc Delete Product
 * @route DELETE api/products/:id
 */
router.delete("/:id", deleteProduct);

module.exports = router;
