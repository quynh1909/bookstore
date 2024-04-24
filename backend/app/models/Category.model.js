const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryName: { type: String, maxLength: 255 },
    categoryDes: { type: String },
  },
  { collection: "category" }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
