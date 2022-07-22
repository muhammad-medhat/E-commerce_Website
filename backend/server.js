const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { verifyAuth } = require("./middleware/authMiddleware");
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { stripeCheckout } = require("./controllers/paymentController");
const cors = require("cors");
connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
app.use("/api", require("./routes/routes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Server start on port ${port}`));
