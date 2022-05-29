const express = require("express");
const router = express.Router();
const {
 loginAdmin, logoutAdmin
} = require("../controllers/adminControllers");
//const { verifyAuth } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);
module.exports = router;