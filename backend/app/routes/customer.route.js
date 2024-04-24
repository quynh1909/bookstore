const express = require("express");
const customers = require("../controllers/customer.controller");
const authentication = require("../controllers/authentication.controller");
const router = express.Router();

router.route("/signUp").post(customers.signUp);

router.route("/signIn").post(customers.signIn);

router.route("/signOut").post(customers.signOut);

router.route("/").get(authentication.authenticateJWT, customers.findAll);
router
  .route("/:id")
  .get(authentication.authenticateJWT, customers.getProfile)
  .patch(authentication.authenticateJWT, customers.updateProfile);

module.exports = router;
