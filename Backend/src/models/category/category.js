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
//? Category Model:
const CategorySchema = new mongoose.Schema(
  {
   
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Category", CategorySchema);
