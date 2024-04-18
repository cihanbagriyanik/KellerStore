"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {

// }

/* -------------------------------------------------------------------------- */
//? Address Staff Model:
const AddressStaffSchema = new mongoose.Schema(
  {},

  {
    collection: "addressStaffs",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("AddressStaff", AddressStaffSchema);
