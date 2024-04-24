const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const adminSchema = new Schema(
  {
    name: { type: String, maxLength: 255 },
    username: { type: String },
    password: { type: String, require: true },
  },
  { collection: "admin" }
);

// Ma hoa mat khau

adminSchema.pre("save", function (next) {
  const admin = this;
  if (!admin.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(admin.password, salt, (err, hash) => {
      admin.password = hash;
      next();
    });
  });
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
