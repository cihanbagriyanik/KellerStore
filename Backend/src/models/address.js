"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//    zipCode:"test00000"
// }

/* -------------------------------------------------------------------------- */
//? Address Model:
const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    street: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    zipCode: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    city: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    country: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    doorBellName: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
  },

  {
    collection: "addresses",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Address", AddressSchema);
