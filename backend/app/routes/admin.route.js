const express = require("express");

const admin = require("../controllers/admin.controller");

const router = express.Router();

router.route("/signUp").post(admin.signUp);
router.route("/signIn").post(admin.signIn);

router.route("/signOut").post((req, res) => {
  res.json("Đăng xuất");
});

module.exports = router;
