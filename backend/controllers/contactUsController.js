const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ContactUs = require("../model/contactUsModel");


// @desc    customer can send a query or complaints 
// @route   POST /api/customer/
// @access  Public

const customerQuery = asyncHandler(async (req, res) => {
    const { email , comment } = req.body;
    if ( !email || !comment ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const review = await ContactUs.create({
      email,
      comment
    });
    if (review) {
      res.status(201).json({
        email: review.email,
        comment: review.comment,
      });
    } else {
      res.status(400);
      throw new Error("Invalid form data");
    }
  });

// @desc    Admin get all cutomers' query or complaints 
// @route   GET /api/customer/
// @access  Private
  
const getAllCustomers = asyncHandler(async (req, res) => {

    const customer = await ContactUs.find({});
    
    res.status(200).json( customer );
});

// @desc    Admin delete a cutomers' query or complaints 
// @route   DELETE /api/customer/
// @access  Private

const deleteCustomerQuery = asyncHandler(async (req, res) => {

    const customer = await ContactUs.findById(req.params.id);
    
    if (!customer) {
      res.status(400);
      throw new Error("query not found");
    }
      await ContactUs.findByIdAndDelete(req.params.id);
      res.status(201).json({
        id: customer.id,
      });
  });
  

module.exports = { customerQuery, getAllCustomers, deleteCustomerQuery };