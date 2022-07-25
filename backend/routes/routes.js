const { Router } = require("express");
const router = Router();

router.use("/products", require("./api/productRoutes"));
router.use("/users", require("./api/userRoutes"));
router.use("/admin", require("./api/adminRoutes"));
router.use("/categories", require("./api/categoryRoutes"));
router.use("/orders", require("./api/orderRoutes"));
router.use("/coupons", require("./api/couponRoutes"));
router.use("/product", require("./api/productReviewRoutes"));
router.use("/cart", require("./api/cartRoutes"));
router.use("/customer", require("./api/contactUsRoutes"));
router.use("/statistics", require("./api/statisticsRoutes"));
router.use("/brands", require("./api/brandRoutes"));

module.exports = router;
