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
    id: code,
    percent_off: discount,
    duration: "once",
    max_redemptions,
  });
  await stripe.promotionCodes.create({
    coupon: coupon.id,
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
  const coupon = await stripe.coupons.list();  
  const coupons = await Coupon.find();
  res.status(200).json({ coupons, coupon });
});

// @desc    delete a Coupons
// @route   GET /api/coupons/
// @access  Private

const delCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.body.code });
  if (!coupon) {
    res.status(400);
    throw new Error("coupon not found");
  }
  await Coupon.findByIdAndDelete(coupon._id);
  const deleted = await stripe.coupons.del(
    req.body.code  
  );
  res.status(201).json({
    id: coupon._id,
    deleted,
  });
  
});
module.exports = { createCoupon, viewCoupon, delCoupon };
