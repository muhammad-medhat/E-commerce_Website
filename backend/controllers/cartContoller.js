const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

// Create cart utility function
const createCart = asyncHandler(async (id) => {
  await Cart.create({
    userId: id,
    session: ";khj",
    items: new Array(),
  });
});

// @desc    Add an item to the cart
// @route   POST /api/cart/add
// @access  private
const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(400);
    throw new Error("Product doesn't exist");
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    createCart(userId);
  }

  if (
    !product.quantityInStock ||
    product.quantityInStock < parseInt(quantity)
  ) {
    res.status(400);
    throw new Error(
      "The quantity requested is greater than the quantity in stock"
    );
  }

  const cartItem = {
    name: product.name,
    price: product.price,
    quantity,
  };

  cart = await Cart.findOne({ userId });
  // If the cart item already exists in the cart update it
  cart.items = cart.items.filter((item) => item.name !== cartItem.name);
  cart.items.push(cartItem);
  await cart.save();

  res.json(cart);
});

module.exports = { addItemToCart };
