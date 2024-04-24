const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    customerId: { type: String },
    totalCost: { type: Number },
    totalOrder: { type: Number },
    billTime: { type: Date, default: Date.now },
    status: { type: Number, default: 1 }, // Thêm trường status với giá trị mặc định là 1
  },
  { collection: "bills" }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
