const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookshop");
    console.log("Kết nối thành công");
  } catch (error) {
    console.log("Kết nối thất bại");
  }
}

module.exports = { connect };
