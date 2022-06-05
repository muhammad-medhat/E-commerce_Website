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
 * @Desc Gets a single Order by id for the current logged in user
 * @route GET api/orders/:id
 * @access Private user
 */
const getOrder = asyncHandler(async (req, res) => {
  if (exists(req.params.id)) {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      order,
    });
  } else {
    //   throw new Error(`Order not found`);

    res.status(400).json({
      code: res.statusCode,
      message: "Please enter a valid order id",
    });
  }
});

/**
 * @Desc Cancel an Order
 * @route Delete api/orders/:id
 * @access Private admin
 */
const archiveOrder = asyncHandler(async (req, res) => {

  const {id} = req.params;
  if (exists(id)) {
    // const order = await Order.findById(id);
    // const arc = order.archived;

    Order.updateOne({ _id: id }, { archived: true }, (err) => {
      if (err) {
        res.json({
          statusCode: 400,
          message: err.message,
        });
      } else {
        res.json({
          statusCode: 200,
          message: "Order archived"
          
        });
      }
    });
  } else {  
    res.json({
      statusCode: 404,
      message: "Order not found"
    });
  }
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
   * check the cart logic before implementing
   */
  const id = req.params.id;

  const order = await Order.findOne({ id });
  if (!order) {
    res.status(400);
    throw new Error("Invalid order");
  } else {
    const updated = await Order.findByIdAndUpdate(id, {});
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
function exists(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  getOrder,
  getAllOrders,
  updateOrder,
  createOrder,
  archiveOrder,
  getCats,
  getBrands,
};
