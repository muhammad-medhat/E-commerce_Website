const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../model/userModel");

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  let { username, newPassword, password, email } = req.body;

  if (!username && !newPassword && !password && !email) {
    res.status(400);
    throw new Error("No fields to update");
  }

  if (username) {
    let updatedUser = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else if (email) {
    if (user.password === password) {
      let updatedUser = await User.findByIdAndUpdate(
        id,
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
    if (user.password === password) {
      let updatedUser = await User.findByIdAndUpdate(
        id,
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
  }
});

// Register User with POST route
const regUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Please add all fields");
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// GET a user

const getUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
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
});

// log out users

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

module.exports = { updateUser, regUser, getUser, logoutUser, loginUser };
