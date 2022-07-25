const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Order = require("../model/orderModel");
const { getUser } = require("./userController");
const User = require("../model/userModel");
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

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
 * @Desc Gets a single Order by its id
 * for the current loggedin user
 * @route GET api/orders/:id
 * @access Private user
 */
const getOrder = asyncHandler(async (req, res) => {
  if (exists(req.params.id)) {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(400);
      throw new Error("Order not found");
    }
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
  const { id } = req.params;
  if (exists(id)) {
    const order = await Order.findById(id);
    if (order.status !== "pending") {
      res.status(400);
      throw new Error(`Order is already ${order.status}`);
    }

    Order.updateOne({ _id: id }, { archived: true }, (err) => {
      if (err) {
        res.json({
          statusCode: 400,
          message: err.message,
        });
      } else {
        res.json({
          statusCode: 200,
          message: "Order archived",
        });
      }
    });
  } else {
    res.json({
      statusCode: 404,
      message: "Order not found",
    });
  }
});

/**
 * @Desc Create an Order
 * @route POST api/orders/
 * @access Private user
 */
const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    res.status(400);
    throw new Error("Cart is Empty");
  }
  const order = await Order.create({
    userId: req.user.id,
    orderDetails: cart.items,
  });
  res.json({
    code: res.statusCode,
    message: "New Order created",
  });
});

/**
 * @Desc Update an Order
 * @route PUT api/orders/:id
 * @access Private admin
 */

const updateOrder = asyncHandler(async (req, res) => {
  /**
   * this function will update an order
   * Admin can update order status
   */

  const { id } = req.params;

  if (exists(id)) {
    const order = await Order.findById(id);

    const { total, items } = req.body;
    if (items) {
      const updated = await Order.findByIdAndUpdate(
        id,
        { total, orderDetails: items },
        { new: true }
      );
      res.status(200).json({
        message: "Order updated successfully",
        order: updated,
      });
    } else {
      res.status(400).json({
        code: res.statusCode,
        message: "Please add items to your cart",
        order,
      });
    }
  } else {
    // if id is not valid
    res.status(400);
    throw new Error("Invalid order");
  }
});

/**
 * @Desc checkout order
 * @route PUt api/orders/:id/checkout
 * @access Private user
 * @body {
 *    shippintAddress
 * }
 *  */
const checkoutOrder = asyncHandler(async (req, res) => {
  //shipping address not saved
  const { id } = req.params;
  const { shippingAddress } = req.body;
  if (exists(id)) {
    //try to calculate the total

    const total = await getTotal(id);
    const order = await Order.findByIdAndUpdate(
      id,
      { total, shippingAddress, status: "in review" },
      { new: true }
    );
    res.status(200).json({
      message: "Order in review",
      order: order,
    });
  } else {
    // if id is not valid
    res.status(400);
    throw new Error("Invalid order");
  }
});

/**
 * @Desc get delivery time
 * @route GET api/orders/:id/delivery
 * @access Private user
 *  */
const getDeliveryTime = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (exists(id)) {
    const order = await Order.findById(id);
    //find max delivery daysTillDelivery
    maxDeliveryDays = order.orderDetails[0].items.reduce((acc, item) => {
      return Math.max(acc, item.daysTillDelivery);
    }, 0);
    minDeliveryDays = order.orderDetails[0].items.reduce((acc, item) => {
      return Math.min(acc, item.daysTillDelivery);
    }, 1);

    res.status(200).json({
      //order: order,
      min: minDeliveryDays,
      max: maxDeliveryDays,
    });
  } else {
    // if id is not valid
    res.status(400);
    throw new Error("Invalid order");
  }
});
/************ private functions ************/
function exists(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
async function getTotal(id) {
  const order = await Order.findById(id);
  const totalPrice = order.orderDetails[0].items.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  return totalPrice;
}

module.exports = {
  getOrder,
  getAllOrders,
  updateOrder,
  createOrder,
  archiveOrder,
  getDeliveryTime,
  checkoutOrder,
};
