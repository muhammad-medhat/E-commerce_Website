const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Order = require("../model/orderModel");


/**
 * @Desc get all Orders
 * @route GET api/orders/
 * @access Private admin, user
 */
const getAllOrders = asyncHandler(async (req, res) => {
  /**
   * get all orders if user is admin
   * get all user orders if user is user 
   */
  const orders = await Order.find();
  res.status(200).json({
    orders,
  });
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
  Order.findByIdAndUpdate(id, {archived: true}, (err, arc) => {
    if (err) {
      res.json({
        message: err,
      });
    } else {
      res.json({
        message: "Order Archived",
        arc,
      });
    }
  });
});


/**
 * @Desc Create an Order
 * @route POST api/orders/
 * @access Private admin
 */
const createOrder = asyncHandler(async (req, res) => {
  let order = req.body;

  order = await Order.create({  });
  res.json({
    code: res.statusCode,
    message: "Order created",
    order,
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
