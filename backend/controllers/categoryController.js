const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Category = require("../model/categoryModel");
const Product = require("../model/productModel");

// @desc    Create Category
// @route   POST /api/categories/
// @access  Private

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
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
    name,
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

// @desc    get all Category
// @route   GET /api/categories/
// @access  Public

const viewCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

// @desc    Delete Category
// @route   DELETE /api/categories/:id
// @access  Private

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("category not found");
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(201).json({
    id: category.id,
  });
});

// @desc    update Category
// @route   PUT /api/categories/:id
// @access  Private

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error(`Category not found`);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedCategory);
});

// @desc    Get category products
// @route   GET /api/categories/:id/products
// @access  Public

const getCategoryProducts = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.find({ _id: categoryId });
  if (exists(categoryId)) {
    const products = await Product.find({
      category: mongoose.Types.ObjectId(categoryId),
    });

    res.status(200).json({ ...category, products });
  }
});

/**
 * @desc    get single Category by name
 * @param {*} name
 * @returns object
 */

const getCatByName = async (name) => {
  const category = await Category.findOne({ name });
  if (!category) {
    return null;
  } else {
    return category;
  }
};

function exists(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
module.exports = {
  createCategory,
  viewCategory,
  deleteCategory,
  updateCategory,
  getCategoryProducts,
  getCatByName,
};
