const Bill = require("../models/Bill.model");
const APIError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const bill = new Bill(req.body);
    const savedBill = await bill.save();
    res.json(savedBill);
    console.log(req.body);
  } catch (error) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi tạo hóa đơn"));
  }
};
exports.fillAll = async (req, res, next) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    return next(
      new APIError(500, "Đã có lỗi xảy ra khi lấy danh sách hóa đơn")
    );
  }
};
exports.update = async (req, res, next) => {
  try {
    const billId = req.params.id;
    const bill = await Bill.findByIdAndUpdate(billId, req.body, { new: true });

    if (!bill) {
      return res.status(404).json({
        error: "Hóa đơn không tồn tại",
      });
    }
    res.json("Hóa đơn đã được cập nhật thành công");
  } catch (error) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi cập nhật hóa đơn"));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const billId = req.params.id;
    const bill = await Bill.findByIdAndDelete(billId);

    if (!bill) {
      return res.status(404).json({
        error: "Hóa đơn không tồn tại",
      });
    }

    res.json(billId);
  } catch (error) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi xóa hóa đơn"));
  }
};
exports.findOne = async (req, res, next) => {
  try {
    const billId = req.params.id;
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({
        error: "Hóa đơn không tồn tại",
      });
    }

    res.json(bill);
  } catch (error) {
    return next(
      new APIError(500, "Đã có lỗi xảy ra khi lấy thông tin hóa đơn")
    );
  }
};
exports.findByCustomerId = async (req, res, next) => {
  try {
    const customerId = req.params.id; 
    const bills = await Bill.find({ customerId: customerId });

    if (!bills || bills.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy hóa đơn nào cho khách hàng này",
      });
    }

    res.json(bills);
  } catch (error) {
    return next(
      new APIError(
        500,
        `Đã có lỗi xảy ra khi lấy danh sách hóa đơn cho khách hàng với ID: ${req.params.customerId}`
      )
    );
  }
};
