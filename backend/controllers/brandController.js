const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Brand = require("../model/brandModel");
const Product = require("../model/productModel");
/**
 * @desc    Create Brand
 * @route   POST /api/brand/
 * @access  Private
 */
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add name");
  }

  const brand = await Brand.create({
    name,
  });

  if (brand) {
    res.status(201).json({
      name: brand.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid brand data");
  }
});

/**
 *  @desc    get all Brand
 *  @route   GET /api/brand/
 *  @access  Public
 * */

const viewBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json({ brands });
});

/**
 * @desc    Delete Brand
 * @route   DELETE /api/brand/:id
 * @access  Private
 * */
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    res.status(400);
    throw new Error("brand not found");
  }
  await Brand.findByIdAndDelete(req.params.id);
  res.status(201).json({
    id: brand.id,
  });
});

/**
 * @desc    update Brand
 * @route   PUT /api/brand/:id
 * @access  Private
 * */
const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    res.status(400);
    throw new Error(`Brand not found`);
  }

  const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBrand);
});

/**
 *  @desc    Get a Single Brand
 *  @route   GET /api/brand/:id
 *  @access  Public
 * */

const viewBrand = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const brand = await Brand.findById(id);

  if (!brand) {
    res.status(400);
    throw new Error("This brand ID doesn't exist");
  }

  res.status(200).json({ brand: brand });
});

/**
 *  @desc    Get Brand products
 *  @route   GET /api/brand/:id/products
 *  @access  Public
 * */

const getBrandProducts = asyncHandler(async (req, res) => {
  const brandId = req.params.id;
  const brand = await Brand.findById(brandId);
  if (!brand) {
    res.status(400);
    throw new Error("This brand ID doesn't exist");
  }

  const products = await Product.find({
    brand: brandId,
  });

  res.status(200).json({ brand: brand.name, products });
});

function exists(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  createBrand,
  viewBrands,
  viewBrand,
  deleteBrand,
  updateBrand,
  getBrandProducts,
};
