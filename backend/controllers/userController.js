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
    if (user.password === password) {
      let updatedUser = await User.findByIdAndUpdate(
        id,
        {
          password: newPassword,
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

module.exports = { updateUser };
