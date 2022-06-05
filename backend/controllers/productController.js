const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
 * @route   POST /api/products/:id
 * @access  Private Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = req.body;

  product = await Product.create({
    name: product.name,
    description: product.description,
    images: product.images,
    price: product.price,
    category: product.category,
    brand: product.brand,
    quantityInStock: product.quantityInStock,
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
  const { name, description, image, price, category, brand, quantityInStock } =
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
      quantityInStock: quantityInStock,
    });
    res.status(200).json({
      message: "Product updated successfully",
      orig: product,
      updated,
    });
  }
});

/**
 * my functions
 */
const generateProducts = asyncHandler(async (req, res) => {
  // res.json({ message: "generating products" });
  const products =[]
  fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    Array.from(data.products).forEach( async element => {
      const product = await ProductM.create({
        name: element.title,
        description: element.description,
        images: element.images,
        thumbnail: element.thumbnail,
        price: element.price,
        category: catController.getCatByName(element.category)._id,
        //brand: element.brand,
        quantity: element.quantity,
      });
      products.push(product);
    });
    res.json({ 
      message: "products generated",
      products,
      data
     });
  });
});


const genCats = asyncHandler(async (req, res) => {
  //res.json({ message: "generating categories" });

  fetch('https://dummyjson.com/products/categories')
  .then(res => res.json())
  .then(dt=>{
    dt.forEach(async (item) => {
      const category = await Category.create({
        name: item,
      });
    });
    res.json({dt})
  });
    

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

  generateProducts, genCats,
};
