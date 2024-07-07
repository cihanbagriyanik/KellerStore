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
      
    },

    street: {
      type: String,
      trim: true,
     
    },

    zipCode: {
      type: String,
      trim: true,
      required: true,
      index: true,
      validate: {
        validator: function (zipCode) {
          //? Regex for zip code:
          const data = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode);
          console.log(data,"validate")
          if(!data){
            const error = new Error("........... zip code...............");
            error.statusCode = 400;
            throw error;
          
          }
          return true
             
    }
      
    }},

    city: {
      type: String,
      trim: true,
    
     
    },

    country: {
      type: String,
      trim: true,
     
      index: true,
    },

    doorBellName: {
      type: String,
     
    },
  },

  {
    collection: "addresses",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Address", AddressSchema);

