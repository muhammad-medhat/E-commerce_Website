const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Coupon = require("../model/couponModel");
const Product = require("../model/productModel");

// @desc    Create Coupon
// @route   POST /api/coupons/
// @access  Private

const createCoupon = asyncHandler(async (req, res) => {
  const { code, description, expiresAt, discount } = req.body;

  if (!code || !description || !expiresAt || !discount) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if coupon exists
  const couponExists = await Coupon.findOne({ code });

  if (couponExists) {
    res.status(400);
    throw new Error("coupon already exists");
  }

  const coupon = await Coupon.create({
    code,
    description,
    expiresAt,
    discount,
  });

  if (coupon) {
    res.status(201).json({
      id: coupon._id,
      code: coupon.code,
      description: coupon.description,
      expiresAt: coupon.expiresAt,
      discount: coupon.discount,
    });
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

// @desc    get a Coupons
// @route   GET /api/coupons/:id
// @access  Private

const getCoupon = asyncHandler(async (req, res) => {
  const couponId = req.params.id;
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    res.status(400);
    throw new Error(`Coupon doesn't exist`);
  }
  if (coupon) {
    let today = new Date();
    let dbDate = new Date(coupon.expiresAt);

    if (today.getTime() > dbDate.getTime()) {
      res.status(400);
      throw new Error(`Coupon is expired`);
    }
    const userId = req.user.id;
    if (coupon.usersUsed[userId]) {
      res.status(401);
      throw new Error(`Coupon has already been used`);
    }
    coupon.usersUsed[userId] = true;
    await coupon.save();
    res.status(200).json(coupon.discount);
  }
});

module.exports = { createCoupon, viewCoupon, getCoupon };
