const express = require("express");
const bill = require("../controllers/bill.controller");
const router = express.Router();

router.route("/").get(bill.fillAll).post(bill.create);

router.route("/:id").get(bill.findOne).patch(bill.update).delete(bill.delete);

router.route("/billuser/:id").get(bill.findByCustomerId);
module.exports = router;
