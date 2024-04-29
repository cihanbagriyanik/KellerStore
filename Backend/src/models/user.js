"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

const passwordEncrypt = require("../helpers/passwordEncrypt");
/* -------------------------------------------------------------------------- */
// {
//     "username": "test",
//     "password": "1234",
//     "email": "test@site.com",
//     "isAdmin": "true"
// }
/* -------------------------------------------------------------------------- */
//? User Model:
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
//hasan
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
