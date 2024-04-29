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
//? Message Model:
const MessageSchema = new mongoose.Schema(
  {
    senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  receiverUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",//Ad deki userId olmasi gerekiyor diye dusunuyorum
    required: true,
    index: true,
  },
  message: {
    type: String,
    trim: true,
    required: true,
    index: true,
  },

},

  {
    collection: "messages",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Message", MessageSchema);
