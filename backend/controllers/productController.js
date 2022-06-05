const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../model/productModel");

const Category = require("../model/categoryModel");
const Brand = require("../model/brandModel");

// GET all Products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
});

//get single product
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
  Product.findByIdAndUpdate(id, { quantityInStock: 0 }, { new: true }, (err, product) => {
    if (err) {
      res.status(400).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted",
      product,
    });
  });
});
      


/**
 * @desc    Create product
 * @route   POST /api/products/
 * @access  Private Admin
 * */
const createProduct = asyncHandler(async (req, res) => {
  const product = req.body;

  product = await Product.create({
    name: product.name,
    description: product.description,
    images: product.images,
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
