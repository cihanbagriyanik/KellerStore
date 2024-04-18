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
  storage: multer.diskStorage({
    destination: "./upload/",
    filename: function (req, file, returnCallback) {
      returnCallback(null, file.originalname);
    },
  }),
});
