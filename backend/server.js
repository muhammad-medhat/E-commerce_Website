const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { verifyAuth } = require("./middleware/authMiddleware");
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { stripeCheckout } = require("./controllers/paymentController");
const cors = require("cors")
connectDB();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/product", require("./routes/productReviewRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/customer", require("./routes/contactUsRoutes"));
app.use("/api/statistics", require("./routes/statisticsRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.post("/api/checkout", verifyAuth, stripeCheckout);
app.use(errorHandler);
app.listen(port, () => console.log(`Server start on port ${port}`));
