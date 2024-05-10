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
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad",
    
    
  },
  favorite: {
    type: String,
    trim: true,
    required: true,
    
  },
},

  {
    collection: "favorites",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Favorite", FavoriteSchema);
