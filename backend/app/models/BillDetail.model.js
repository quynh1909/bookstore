const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billDetailSchema = new Schema(
  {
    productId: { type: String },
    billId: { type: String },
    quantity: { type: Number },
    price: { type: Number },
  },
  {
    collection: "billDetail",
  }
);

const BillDetail = mongoose.model("BillDetail", billDetailSchema);
module.exports = BillDetail;
