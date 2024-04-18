"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../../configs/dbConnection");

const passwordEncrypt = require("../../helpers/passwordEncrypt");
/* -------------------------------------------------------------------------- */
// {

// }
/* -------------------------------------------------------------------------- */
//? Sub Category Model:
const SubCategorySchema = new mongoose.Schema(
  {
   
  },
  {
    collection: "subcategories",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("SubCategory", SubCategorySchema);
