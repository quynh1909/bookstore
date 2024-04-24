const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const customerRoute = require("./app/routes/customer.route");
const adminRoute = require("./app/routes/admin.route");
const categoryRoute = require("./app/routes/category.route");
const bookRoute = require("./app/routes/book.route"); 
const billRoute = require("./app/routes/bill.route");
const billDetailRoute = require("./app/routes/billdetail.route");
const app = express();
var cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/customers", customerRoute);
app.use("/api/admin", adminRoute);
app.use("/api/category", categoryRoute);
app.use("/api/book", bookRoute);
app.use("/api/bill", billRoute);
app.use("/api/billDetail", billDetailRoute);

// Error
app.use((req, res, next) => {
  return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Lỗi máy chủ nội bộ",
  });
});

app.get("/", function (req, res) {
  res.json({ message: "" });
});

module.exports = app;
