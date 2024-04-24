const express = require("express");
const billDetail = require("../controllers/billdetail.controller");
const router = express.Router();

router.route("/").get(billDetail.fillAll).post(billDetail.create);

router
  .route("/:id")
  .get(billDetail.findOne)
  .patch(billDetail.update)
  .delete(billDetail.delete);

router
  .route("/getdetail/:id")
  .get(billDetail.findByBillId)
  .delete(billDetail.deleteByBillId);
module.exports = router;
