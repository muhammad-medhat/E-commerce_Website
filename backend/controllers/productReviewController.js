const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ProductReview = require("../model/productReviewModel");
const Product = require("../model/productModel");


// @desc    Add a Review to a product 
// @route   POST /api/product/:id/review
// @access  Private

const createReview = asyncHandler(async (req, res) => {
    const { stars , comment } = req.body;
    if ( !stars || !comment ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const productId = req.params.id;
    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      res.status(400);
      throw new Error("Product doesn't exists");
    }
   
    // Check if user review exists
    const reviewExists = await ProductReview.findOne({ userId: req.user.id , productId: productId});
    if (reviewExists) {
      res.status(400);
      throw new Error(" You have already reviewed this product ");
    }
    const review = await ProductReview.create({
      stars,
      comment,
      userId : req.user.id,
      productId : req.params.id
    });
    if (review) {
      res.status(201).json({
        name: req.user.username,
        stars: review.stars,
        comment: review.comment,
      });
    } else {
      res.status(400);
      throw new Error("Invalid review data");
    }
  });


 
// @desc    Get Product Reviews
// @route   Get /api/product/:id
// @access  Public



const getReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(400).json({
      message: "Product doesn't exists",
    });
  }
  // show the avg reviews and the count of reviews
  const reviews = await ProductReview.aggregate([
    {
      $match: {
        productId: mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$productId",
        averageStars: { $avg: "$stars" },
        count: { $sum: 1 },
      },
    },
  ]);
  //show All the comment andiew of thproduct
  const reviewsList = await ProductReview.find({ productId: productId });
  if (reviews) {
    res.status(200).json({
      reviews,
      reviewsList,
    });
  } else {
    res.status(400);
    throw new Error("No reviews found");
  }
}

);


module.exports = { createReview , getReviews }
