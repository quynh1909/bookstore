const Book = require("../models/Book.model");
const APIError = require("../api-error");
const Joi = require("joi");
const ApiError = require("../api-error");
const authenticateJWT = require("./authentication.controller");

exports.create = async (req, res, next) => {
  try {
    const schema = Joi.object({
      bookName: Joi.string().max(255).required(),
      bookDes: Joi.string(),
      categoryId: Joi.string().required(),
      price: Joi.number(),
      quantity: Joi.number(),
      trademark: Joi.string(),
      origin: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Dữ liệu có lỗi! Vui lòng kiểm tra lại dữ liệu của bạn",
      });
    }
    const uploadedFiles = req.files
      ? req.files.map((file) => file.filename)
      : [];
    req.body.bookImg = uploadedFiles;

    const newBook = new Book(req.body);

    // Lưu sách mới vào cơ sở dữ liệu
    await newBook.save();

    // Trả về thông báo thành công hoặc sách vừa được tạo
    res.json("Thêm sách thành công");

  } catch (err) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi tạo sách"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    return next(
      new ApiError(500, "Đã có lỗi xãy ra khi lấy danh sách sách")
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const bookId = req.body._id; // Lấy ID sách từ tham số đường dẫn

    // Kiểm tra xem có tồn tại sách với ID đã cung cấp không
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({
        error: "Sách không tồn tại",
      });
    }

    // Cập nhật các trường dữ liệu của sách
    existingBook.bookName =
      req.body.bookName || existingBook.bookName;
    existingBook.bookDes =
      req.body.bookDes || existingBook.bookDes;
    existingBook.categoryId =
      req.body.categoryId || existingBook.categoryId;
    existingBook.price = req.body.price || existingBook.price;
    existingBook.quantity = req.body.quantity || existingBook.quantity;
    existingBook.trademark = req.body.trademark || existingBook.trademark;
    existingBook.origin = req.body.origin || existingBook.origin;
    // Xử lý tệp đã tải lên nếu có
    if (req.files && req.files.length > 0) {
      existingBook.bookImg = req.files.map((file) => file.filename);
    }

    // Lưu sách đã cập nhật
    await existingBook.save();

    // Trả về thông báo thành công và sách vừa được cập nhật
    res.json({
      message: "Cập nhật sách thành công",
      book: existingBook,
    });
  } catch (err) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi cập nhật sách"));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const bookId = req.params.id; // Lấy ID sách từ tham số đường dẫn

    // Kiểm tra xem có tồn tại sách với ID đã cung cấp không
    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({
        error: "Sách không tồn tại",
      });
    }

    // Xóa sách
    await existingBook.deleteOne({ _id: bookId });

    // Trả về thông báo thành công
    res.json({
      message: "Sách đã được xóa thành công",
    });
  } catch (err) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi xóa sách"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const bookId = req.params.id; // Lấy ID sách từ tham số đường dẫn

    // Sử dụng Mongoose để lấy thông tin sách bằng ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        error: "Sách không tồn tại",
      });
    }

    // Trả về thông tin sách
    res.json(book);
  } catch (err) {
    return next(
      new APIError(500, "Đã có lỗi xảy ra khi lấy thông tin sách")
    );
  }
};

exports.updateQuality = async (req, res, next) => {
  try {
    const bookId = req.params.id; // Get the book ID from the request parameters
    const quality = req.body.quality; // Get the quality value from the request body

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        error: "Sách không tồn tại",
      });
    }

    // Update the quality of the book
    book.quality = quality;

    // Save the updated book
    await book.save();

    // Return a success message and the updated book
    res.json({
      message: "Cập nhật chất lượng sách thành công",
      book: book,
    });
  } catch (err) {
    return next(new APIError(500, "Đã có lỗi xảy ra khi cập nhật chất lượng sách"));
  }
};