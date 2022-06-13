const express = require("express");
const router = express.Router();
const {
  customerQuery,
  getAllCustomers,
  deleteCustomerQuery
} = require("../controllers/contactUsController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", customerQuery);
router.get("/", verifyAdmin, getAllCustomers);
router.delete("/:id", verifyAdmin, deleteCustomerQuery);

module.exports = router;