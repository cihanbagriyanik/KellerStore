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
//? Category Model:
const CategorySchema = new mongoose.Schema(
  {
   name:{
    type:String,
    required:true,
    trim:true
   },
   slug:{
    type:String,
    required:true,
    trim:true
   },
   //burdaki mantik ana baslik bu bunu altaki cocouklari olacak 
   //elektronik bu olacalk bunda sonrakiler cep telefonu ayrioladak
   //firavun faresi deniyor ama tam bilmiyorrum
   parentId:{
    type:String,
   }
  },
  {
    
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Category", CategorySchema);
