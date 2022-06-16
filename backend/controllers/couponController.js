const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Coupon = require("../model/couponModel");
const Product = require("../model/productModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @desc    Create Coupon
// @route   POST /api/coupons/
// @access  Private

const createCoupon = asyncHandler(async (req, res) => {
  const { code, description, expiresAt, discount, max_redemptions } = req.body;

  if (!code || !description || !expiresAt || !discount || !max_redemptions) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if coupon exists
  const couponExists = await Coupon.findOne({ code });

  if (couponExists) {
    res.status(400);
    throw new Error("coupon already exists");
  }
  const coupon = await stripe.coupons.create({
    percent_off: discount,
    duration: "once",
    max_redemptions,
  });
  const createdCoupon = await Coupon.create({
    code,
    description,
    expiresAt,
    discount,
  });
  if (coupon) {
    res.status(201).json(createdCoupon);
  } else {
    res.status(400);
    throw new Error("Invalid coupon data");
  }
});

// @desc    get all Coupons
// @route   GET /api/coupons/
// @access  Private

const viewCoupon = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json({ coupons });
});

module.exports = { createCoupon, viewCoupon };
