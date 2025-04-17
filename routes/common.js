const express = require("express");
const router = express.Router();
const { register, login,authMe } = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me",protect, authMe);

module.exports = router;
