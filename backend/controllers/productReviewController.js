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
    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      res.status(400);
      throw new Error("Product doesn't exists");
    }

     // Check if product review exists
     const reviewExists = await ProductReview.find({ productId: productId});
     if (!reviewExists) {
       res.status(400);
       throw new Error(" This product doesn't have any views yet");
     }
     const count = await ProductReview.find({ productId: productId}).count();
  ProductReview.aggregate([
    {
      '$group': {
        '_id': req.params.id,
        'avg': {
          '$avg':{ $round : [reviewExists[0].stars, 1]}
        }
      }
    }
  ], function (err, data){
    let avg =  data[0].avg;
    let counter =  data[0].counter;
    let reviews = reviewExists[0];
    if (reviewExists) {
        res.status(201).json({
           reviews, 
            avg, 
            count
        });
      } else {
        res.status(400);
        throw new Error("no reviews to be shown");
      }
  })
  
  });

module.exports = { createReview , getReviews }