const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../model/productModel");

const Category = require("../model/categoryModel");
const Brand = require("../model/brandModel");

/**
 * @desc    GET all Products
 * @route   GET /api/products/
 * @access  Public
 */

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
});

/**
 * @desc    GET single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error(`Product not found`);
  }

  res.status(200).json(product);
});

/**
 * functions to be used by Admin
 */
/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id, (err, del) => {
    if (err) {
      res.json({
        message: err,
      });
    } else {
      res.json({
        message: "successful Delete",
        del,
      });
    }
  });
});

/**
 * @desc    Create product
 * @route   POST /api/products/:id
 * @access  Private
 */
const createProduct = asyncHandler(async (req, res) => {
  let product = req.body;

  product = await Product.create({
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    category: product.category,
    brand: product.brand,
  });
  res.json({
    code: res.statusCode,
    message: "Product created",
    product,
  });
});

/**
 * @desc    Update product
 * @route   Put /api/products/:id
 * @access  Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, image, price, category, brand, quantity } =
    req.body;

  const id = req.params.id;

  const product = await Product.findOne({ id });
  if (!product) {
    res.status(400);
    throw new Error("Invalid product");
  } else {
    const updated = await Product.findByIdAndUpdate(id, {
      name: name,
      description: description,
      image: image,
      price: price,
      category: category,
      brand: brand,
      quantity: quantity,
    });
    res.status(200).json({
      message: "Product updated successfully",
      orig: product,
      updated,
    });
  }
});

const getCats = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json({ brands });
});

module.exports = {
  getProduct,
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getCats,
  getBrands,
};
