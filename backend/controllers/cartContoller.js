const asyncHandler = require("express-async-handler");
const req = require("express/lib/request");
const mongoose = require("mongoose");
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const CartItem = require("../model/cartItemModel");

// Create cart utility function
const createCart = asyncHandler(async (id) => {
  await Cart.create({
    userId: id,
    items: new Array(),
  });
});

// @desc    Get all the elements in the cart
// @route   GET /api/cart/
// @access  private
const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    createCart(userId);
  }
  res.json(cart.items);
});

// @desc    Add an item to the cart
// @route   PUT /api/cart/add
// @access  private
const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  // you have to check if the prodct still exists
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

  const cartItem = await CartItem.create({
    productId,
    name: product.name,
    totalPrice: product.price * quantity,
    quantity,
  });

  cart = await Cart.findOne({ userId });
  // If the cart item already exists in the cart update it
  cart.items = cart.items.filter((item) => !item.productId.equals(productId));
  cart.items.push(cartItem);
  await cart.save();

  res.json(cart.items);
});

// @desc    Remove an item from the cart
// @route   PUT /api/cart/remove
// @access  private
const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    res.status(400);
    throw new Error("Can't remove a product from a cart that doesn't exist");
  } else {
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();
    res.json(cart.items);
  }
});

module.exports = { addItemToCart, removeItemFromCart, getCartItems };
