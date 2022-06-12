const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../model/productModel");
const ProductM = require("../model/productMModel");

const Category = require("../model/categoryModel");
const Brand = require("../model/brandModel");
const catController = require("../controllers/categoryController");
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
 * @desc    Delete product (set stock to 0)
 * @route   DELETE /api/products/:id
 * @access  Private Admin
 * */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(
    id,
    { quantityInStock: 0 },
    { new: true },
    (err, product) => {
      if (err) {
        res.status(400).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        message: "Product deleted",
        product,
      });
    }
  );
});

/**
 * @desc    Create product
 * @route   POST /api/products/
 * @access  Private Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  // const product = req.body;
  const {
    name,
    description,
    images,
    mainImage,
    price,
    category,
    brand,
    quantityInStock,
    stock,
    handling,
  } = req.body;

  //check if product exists
  const product = await Product.findOne({ name });
  if (product) {
    res.status(400).json({
      message: "Product already exists",
    });
  } else {
    const newProduct = new Product({
      name,
      description,
      images,
      mainImage,
      price,
      category,
      brand,
      quantityInStock,
      stock,
      handling,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Product created",
      newProduct,
    });
  }
});

/**
 * @desc    Update product
 * @route   Put /api/products/:id
 * @access  Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    images,
    mainImage,
    price,
    category,
    brand,
    quantityInStock,
    deliveryTime,
  } = req.body;

  const id = req.params.id;

  const product = await Product.findOne({ id });
  if (!product) {
    res.status(400);
    throw new Error("Invalid product");
  } else {
    const updated = await Product.findByIdAndUpdate(id, {
      name,
      description,
      images,
      mainImage,
      price,
      category,
      brand,
      quantityInStock,
      deliveryTime,
    });
    res.status(200).json({
      message: "Product updated successfully",
      orig: product,
      updated,
    });
  }
});

module.exports = {
  getProduct,
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
};
