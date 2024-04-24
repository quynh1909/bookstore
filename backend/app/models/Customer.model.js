const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const customerSchema = new Schema({
  name: { type: String, maxLength: 255 },
  phone: { type: String, maxLength: 20 },
  address: { type: String, maxLength: 200 },
  email: { type: String, maxLength: 100 },
  password: { type: String, required: true }, // Thêm thuộc tính password
});

// Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
customerSchema.pre("save", function (next) {
  const customer = this;
  // Kiểm tra xem mật khẩu có bị thay đổi hay không
  if (!customer.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(customer.password, salt, (err, hash) => {
      if (err) return next(err);

      customer.password = hash;
      next();
    });
  });
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
