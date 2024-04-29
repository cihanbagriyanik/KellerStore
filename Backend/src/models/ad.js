"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "userId": "000000000"
//     "categoryId": "000000000"
//     "title": "title",
//     "addressId": "000000000",
//     "price": "0.00",
//     "offerType": true
// }
/* -------------------------------------------------------------------------- */
//? Ad Model:
const AdSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      trim: true,
    },

    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      trim: true,
      required: true,
    },

    image: {
      type: [],
    },

    offerType: {
      type: Boolean,
      required: true,
    },

    isPublish: {
      type: Boolean,
      default: true,
    },

    countOfVisitor: {
      type: Number,
      trim: true,
      default: 0,
    },

    expireDate: {
      type: Date,
      trim: true,
    },

    soldUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    soldDate: {
      type: Date,
      trim: true,
    },

    isResereved: {
      type: Boolean,
      default: false,
    },

    visitedUser: {
      type: [],
    },

    future: {},
  },
  {
    collection: "ads",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Ad", AdSchema);
