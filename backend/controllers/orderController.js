const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Order = require("../model/orderModel");
const { getUser } = require("./userController");
const User = require("../model/userModel");


/**
 * @Desc get all Orders
 * @route GET api/orders/
 * @access Private user
 */
const getAllOrders = asyncHandler(async (req, res) => {
  /**
   * get all user orders for loggedin user
   * */
  if (!req.user) {
      res.status(400).json({
      code: res.statusCode,
      message: "Please login to see your orders",
    });
  } else {    
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({
      user: req.user,
      num: orders.length,
      orders,
    
    });
  }
});

/**
 * @Desc get single Order
 * @route GET api/orders/:id
 * @access Private user
 */
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400);
    throw new Error(`Order not found`);
  }

  res.status(200).json(order);
});

/**
 * functions to be used by Admin
 */

/**
 * @Desc Archive an Order
 * @route Delete api/orders/:id
 * @access Private admin
 */
const archiveOrder = asyncHandler(async (req, res) => {
  /**
   * archive order 
   */
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    res.status(400);
    throw new Error(`Order not found`);
  }
  order.archived = !order.archived;

      res.json({
        message: "Order Archived",
        order,
      });
   
});


/**
 * @Desc Create an Order
 * @route POST api/orders/
 * @access Private user
 */
const createOrder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const order = await Order.create({ 
    userId: req.user.id,
  });
  res.json({
    code: res.statusCode,
    message: "Order created",
    order
  });
});


/**
 * @Desc Update an Order
 * @route PUT api/orders/
 * @access Private admin
 */

const updateOrder = asyncHandler(async (req, res) => {
  /**
   * not implemented yet
   */
  const id = req.params.id;

  const order = await Order.findOne({ id });
  if (!order) {
    res.status(400);
    throw new Error("Invalid order");
  } else {
    const updated = await Order.findByIdAndUpdate(id, {

    });
    res.status(200).json({
      message: "Order updated successfully",
      orig: order,
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
  getOrder,
  getAllOrders,
  updateOrder,
  createOrder,
  archiveOrder,
  getCats,
  getBrands,
};
