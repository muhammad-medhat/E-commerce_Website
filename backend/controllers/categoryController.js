const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Category = require("../model/categoryModel");

// @desc    Create Category 
// @route   POST /api/category/create
// @access  Private

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
  
    if ( !name ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if category exists
    const categoryExists = await Category.findOne({ name });
  
    if (categoryExists) {
      res.status(400);
      throw new Error("category already exists");
    }
  
    const category = await Category.create({
      name
    });
  
    if (category) {
      res.status(201).json({
        name: category.name,
      });
    } else {
      res.status(400);
      throw new Error("Invalid category data");
    }
  });
 
  module.exports = { createCategory };