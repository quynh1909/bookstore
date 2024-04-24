const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookName: { type: String, maxLength: 255 },
    bookDes: { type: String },
    categoryId: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    trademark: { type: String },
    origin: { type: String },
    bookImg: [{ type: String, maxLength: 255 }],
    soldOut: { type: Boolean, default: false },
  },
  { collection: "books" }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
