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
//? Staff Model:
const StaffSchema = new mongoose.Schema(
  {
   
  },
  {
    collection: "staffs",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Staff", StaffSchema);
