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
const User = require("../model/userModel");
const MailService = require("../utilities/mailServices");
const mailService = new MailService();
/**
 * @desc    GET all Products
 * @route   GET /api/products/
 * @access  Public
 */

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: { quantityInStock: { $gt: 0 } },
    },
  ]);
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
  const product = await Product.findByIdAndUpdate(id, { quantityInStock: 0 });
  if (!product) {
    res.status(400);
    throw new Error("The product you are trying to delete doesn't exist");
  }
  res.json(product);
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
    });
    await newProduct.save();
    User.find({}, function (err, allUsers) {
      if (err) {
        console.log(err);
      }
      let mailList = [];
      allUsers.forEach(function (users) {
        mailList.push(users.email);
        return mailList;
      });
      const productMailed = {
        name: newProduct.name,
        description: newProduct.description,
        image: newProduct.mainImage,
        price: newProduct.price,
      };

      let mailInfo = {
        to: mailList,
        subject: " Our latest arrivals",
        template: "productArrivals",
        context: productMailed,
      };
      mailService.sendMail(mailInfo);
    });
    res.status(201).json({
      message: "Product created and an email has been sent to all users",
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
    daysTillDelivery,
  } = req.body;

  const id = req.params.id;

  const product = await Product.findByIdAndUpdate(id, {
    name,
    description,
    images,
    mainImage,
    price,
    category,
    brand,
    quantityInStock,
    daysTillDelivery,
  });

  if (!product) {
    res.status(400);
    throw new Error("The product you are trying to update doesn't exist");
  }

  res.status(200).json(product);
});

module.exports = {
  getProduct,
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
};
