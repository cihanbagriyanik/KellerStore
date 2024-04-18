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
//? Ad Model:
const AdSchema = new mongoose.Schema(
  {
   
  },
  {
    collection: "ads",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Ad", AdSchema);
