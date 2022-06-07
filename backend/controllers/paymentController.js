const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../model/productModel");

const stripeCheckout = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const id = req.user.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (!user.status.equals("ACTIVE")) {
    res.status(400);
    throw new Error("User account is not active");
  } else {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
              name: item.name,
            },
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    });
    res.status(200).json({ url: session.url });
  }
});

module.exports = { stripeCheckout };
