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
//? Notification Model:
const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notificationType: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },
  },

  {
    collection: "notifications",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Notification", NotificationSchema);
