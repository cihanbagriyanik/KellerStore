"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "topCategoryId": "000000000"
//     "categoryId": "000000000"
//     "name": "category-1",
// }
/* -------------------------------------------------------------------------- */
//? Category Model:
const CategorySchema = new mongoose.Schema(
  {
    topCategoryId: {
      type: Number,
      required: true,
      trim: true,
    },
    categoryId: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Category", CategorySchema);
