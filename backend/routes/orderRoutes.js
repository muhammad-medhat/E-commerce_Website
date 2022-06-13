const express = require("express");
const router = express.Router();
const {
  updateOrder,
  createOrder,
  getOrder,
  getAllOrders,
  archiveOrder,
  getCats,
  getBrands,
} = require("../controllers/orderController");
const { verifyAuth } = require("../middleware/authMiddleware");


/**
 * @Desc get all Orders for the logged in user
 * @route GET api/orders/
 * @access Private user
 */
router.get("/", verifyAuth, getAllOrders);

/**
 * @Desc Select single Order
 * @route GET api/orders/:id
 * @access Private user
 */
router.get("/:id", verifyAuth, getOrder);



/**
 * @Desc Create Order
 * @route POST api/orders/
 * @access Private user
 */
router.post("/", verifyAuth, createOrder);

/**
 * @Desc Update Order
 * @route PUT api/orders/:id
 * @access Private user
 */
router.put("/:id", verifyAuth, updateOrder);

/**
 * @Desc Archive Order
 * @route DELETE api/orders/:id
 * @access Private user
 */
router.delete("/:id", verifyAuth, archiveOrder);

module.exports = router;
