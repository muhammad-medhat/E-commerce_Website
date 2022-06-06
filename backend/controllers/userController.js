const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../model/userModel");

// @desc    user can update its account data
// @route   PUT /api/users/user
// @access  Private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  let { username, newPassword, password, email, age, address, phone } =
    req.body;

  if (
    !username &&
    !newPassword &&
    !password &&
    !email &&
    !age &&
    !address &&
    !phone
  ) {
    res.status(400);
    throw new Error("No fields to update");
  }

  if (email) {
    if (await bcrypt.compare(password, user.password)) {
      let updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { email },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400);
      throw new Error("Wrong password");
    }
  } else if (newPassword) {
    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    if (await bcrypt.compare(password, user.password)) {
      let updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          password: hashedPassword,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400);
      throw new Error("Wrong Password");
    }
  } else {
    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, age, address, phone },
      { new: true }
    );
    res.status(200).json({
      username: updateUser.username,
      email: updateUser.email,
      age: updateUser.age,
      address: updateUser.address,
      phone: updateUser.phone,
    });
  }
});

// @desc    Register User
// @route   POST /api/users/register
// @access  Public

const regUser = asyncHandler(async (req, res) => {
  const { username, password, email, age, address, phone } = req.body;

  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Please add all required fields");
  }
  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Encrypting password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    email,
    age,
    address,
    phone,
  });

  if (user) {
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      age: user.age,
      address: user.address,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    GET a user
// @route   GET /api/users/user
// @access  Private

const getUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.params.id);
  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

// @desc    login a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  // checking the user status
  if (user.status === "DEACTIVATED") {
    res.status(400);
    throw new Error("User is Deactivated");
  } else if (user.status === "SUSPENDED") {
    res.status(400);
    throw new Error("User is suspended");
  } else {
    // res.json({up:user.password, p: password, res: (await bcrypt.compare(password, user.password))})
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  }
});

// @desc    logout a user
// @route   GET /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
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
//use cookie to get user id
const getUserId = (req) => {
  const {
    cookies: { jwt },
  } = req;
  if (jwt) {
    const { id } = jwt.split(".")[1];
    return id;
  }
};

module.exports = { updateUser, regUser, getUser, logoutUser, loginUser };
