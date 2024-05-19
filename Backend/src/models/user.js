"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "firstName": "test-1",
//     "lastName": "test-1",
//     "userName": "test-1",
//     "businessName": "1234567877",
//     "email": "test1@example.com",
//     "password": "Secure*1234",
//     "isActive": true,
//     "isAdmin": false,
// }

/* -------------------------------------------------------------------------- */
//? User Model:
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    userName: {
      type: String,
    },

    businessName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    avatar: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    tel: {
      type: Number,
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },

    isBusiness: {
      type: Boolean,
      default: false,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },


    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    future: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
