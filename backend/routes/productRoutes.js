const express = require("express");
const router = express.Router();
const {
  updateProduct,
  createProduct,
  getProduct,
  getAllProducts,
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
 * @Desc Create Product
 * @route POST api/products /
 */
router.post("/", createProduct);

/**
 * @Desc Update Product
 * @route PUT api/products/:id
 */
router.put("/:id", updateProduct);

module.exports = router;
