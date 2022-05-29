const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Admin = require("../model/adminModel");

// Admin log in

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

// logout the admin
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/')
});

// Generate JWT token
const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports = { loginAdmin, logoutAdmin };
