const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const Cart = require("./model/cartModel");

connectDB();

const app = express();

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(port, () => console.log(`Server start on port ${port}`));
