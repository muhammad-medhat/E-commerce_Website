const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Admin = require("../model/adminModel");
const User = require("../model/userModel");

// @desc    Admin log in
// @route   POST /api/admin/login
// @access  Public

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check the email address
  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const token = generateToken(admin._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.json({
      _id: admin.id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin email or password");
  }
});
// @desc    Admin log out
// @route   GET /api/admin/logout
// @access  Private

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

// Generate JWT token
const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
// @desc    GET all Users
// @route   Get /api/admin/users/all
// @access  Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

// @desc    new user password
// @route   PUT /api/admin/users/password
// @access  Private

const updateUserPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid user email");
  } else {
    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).json({ message: "Password updated successfully" });
  }
});

// @description Update User State
// @route POST /api/admin/users/status
// @access Private
const changeUserStatus = asyncHandler(async (req, res) => {
  const { email, status } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid user email");
  } else {
    await User.findByIdAndUpdate(user._id, { status });
    res
      .status(200)
      .json({ message: `Status updated successfully to ${status}` });
  }
});

module.exports = { loginAdmin, logoutAdmin, getAllUsers, updateUserPassword };
