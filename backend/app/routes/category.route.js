const express = require("express");
const category = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(category.findAll).post(category.create);

router
  .route("/:id")
  .get(category.findOne)
  .patch(category.update)
  .delete(category.delete);

module.exports = router;
