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
//? Favorite Model:
const FavoriteSchema = new mongoose.Schema(
  {
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      requried: true,
    },

    favorites: [String],
    // favorites: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'  // Bu alanın neyi referansladığını belirtmeniz gerekiyor
    // }]
  },

  {
    collection: "favorite",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Favorite", FavoriteSchema);
