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
  console.log("Create order");

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // check if user has pending orders
  const pendingOrders = await Order.findOne({
    user: req.user.id,
    status: "pending",
  });
  if (pendingOrders) {
    //update order to add items from cart
    const cart = await Cart.findOne({ user: req.user.id }); // find user cart
    const products = await Product.find({ _id: { $in: cart.items } }); // find products in cart
    console.log("products", products);
    // update order to add items in cart
    const order = await Order.findOneAndUpdate(
      { user: req.user.id, status: "pending" },
      {
        $push: {
          items: {
            $each: products,
          },
        },
      }
    );
    res.status(200).json({
      code: res.statusCode,
      message: "Order Updated",
      // user,
      // cart,
      // order,
    });
  }
  const cart = await Cart.findOne({ user: req.user.id }); // find user cart
  const order = await Order.create({
    userId: req.user.id,
    orderDetails: cart,
  });
  res.json({
    code: res.statusCode,
    message: "New Order created",
    // user,
    // cart,
    // order,
  });
});
const createOrderItem = asyncHandler(async (req, res) => {
  //delete this function
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);

    throw new Error("User not found");
  }
  const cart = await Cart.findOne({ user: req.user.id }); // find user cart
  const order = await Order.create({
    userId: req.user.id,
    orderDetails: cart.items,
  });
  res.json({
    code: res.statusCode,
    message: "Order created",
    order,
  });
});

/**
 * @Desc Update an Order
 * @route PUT api/orders/:id
 * @access Private admin
 */

const updateOrder = asyncHandler(async (req, res) => {
  /**
   * get total from req.body
   * that will be sent from frontend
   * then update the order in our database
   */

  const { id } = req.params;

  if (exists(id)) {
    const order = await Order.findById(id);
    //get items from cart
    //check it again
    //items are obtained from cart not body
    //function not currently in use 
    // consider removing
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

//checkout order
const checkoutOrder = asyncHandler(async (req, res) => {
  //shipping address not saved
  const { id } = req.params;
  const { shippingAddress } = req.body;
  if (exists(id)) {
    //try to calculate the total

    const t = await getTotal(id)
    const order = await Order.findByIdAndUpdate(
      id,
      { total: t, shippingAddress, status: "in review" },
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
async function  getTotal(id) {
  //not sure if this is the correct way to do this
  //checkit again
  const order = await Order.findById(id);
  console.log("order", order.orderDetails[0].items);
  
  const totalPrice = order.orderDetails[0].items.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  // console.log("totalPrice", totalPrice);
  return totalPrice;
}

module.exports = {
  getOrder,
  getAllOrders,
  updateOrder,
  createOrder,
  archiveOrder,
  getDeliveryTime,
  createOrderItem,
  checkoutOrder,
};
