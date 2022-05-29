const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyAdmin, createCategory);

module.exports = router;
