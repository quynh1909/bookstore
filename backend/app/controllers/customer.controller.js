const Customer = require("../models/Customer.model");
const APIError = require("../api-error");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";
exports.signUp = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().max(255).required(),
      phone: Joi.string().max(20),
      address: Joi.string().max(200),
      email: Joi.string().email().max(100).required(),
      password: Joi.string()
        .min(6)
        .pattern(new RegExp("^(?=.*[a-zA-Z]).+$"))
        .required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Dữ liệu có lỗi! Vui lòng kiểm tra lại dữ liệu của bạn!",
      });
    }
    const existingUser = await Customer.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        error: "Email đã tồn tại. Vui lòng sử dụng một email khác.",
      });
    }
    const customer = new Customer(req.body);
    await customer.save();
    res.json("Đăng ký thành công");
  } catch (err) {
    console.error(err);
    return next(new APIError(500, "Đã có lỗi xảy ra khi đăng ký"));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại." });
    }

    const { email, password } = req.body;
    const user = await Customer.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Email hoặc mật khẩu không chính xác." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Email hoặc mật khẩu không chính xác" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
      userId: user._id,
    });
  } catch (error) {
    return next(new APIError(500, "Đã có lỗi xãy ra khi đăng nhập"));
  }
};

exports.signOut = (req, res, next) => {
  try {
    res.clearCookie("tokenCookie");
    res.status(200).json("Bạn đã đăng xuất thành công");
  } catch (error) {
    return next(new APIError(500, "Đã có lỗi xãy ra khi đăng xuất"));
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await Customer.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Người dùng không tồn tại",
      });
    }
    res.json(user);
  } catch (error) {
    return next(new APIError(500, "Lỗi lấy dữ liệu người dùng"));
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const schema = Joi.object({
      name: Joi.string().max(255),
      phone: Joi.string().max(20),
      address: Joi.string().max(200),
      email: Joi.string().max(100),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Dữ liệu có lỗi! Vui lòng kiểm tra lại dữ liệu của bạn!",
      });
    }

    const updatedUser = await Customer.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    res.status(200).json("Cập nhật thông tin người dùng thành công");
  } catch (err) {
    console.error(err);
    return next(new APIError(500, "Đã có lỗi xảy ra khi cập nhật hồ sơ"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    return next(
      new APIError(500, "Đã có lỗi xảy ra khi lấy danh sách khách hàng")
    );
  }
};
