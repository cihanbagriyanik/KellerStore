"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const multer = require("multer");

/* -------------------------------------------------------------------------- */

// app.use(upload.array('fieldName'))

/* -------------------------------------------------------------------------- */
module.exports = multer({
  //limitleme
 
 // limits: {
   // fieldSize: 1024 * 1024 * 2000,
 // },

  //filterleme
  fileFilter: (req, res, cb) => {
    // if(!file.orginalname.match(/\.(jpg|jpeg|png)$/)){
    //return cb(new Error ("please upload an image"))
    //}
    cb(undefined, true); //bunu kullanirsan ne gelirse yuklersin
  },
  //nereye kayfedci ve ne isminde kaydecek
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    destination: "./uploads",
  }),
});

