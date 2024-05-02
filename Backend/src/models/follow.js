"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//    "userId" : "000000000"
//    "followUserId" : "000000000"
//    "favorite" : false
// }

/* -------------------------------------------------------------------------- */
//? Follow Model:
const FollowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  {
    collection: "follows",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Follow", FollowSchema);
