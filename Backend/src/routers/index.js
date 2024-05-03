"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

/* -------------------------------------------------------------------------- */
//? Routes:
//! URL: /

// auth:
router.use("/auth", require("./auth"));

// token:
router.use("/tokens", require("./token"));

// user:
router.use("/users", require("./user"));

//add
router.use("/ad",require("./ad"));

// document:
// router.use("/documents", require("./document"));

/* -------------------------------------------------------------------------- */
module.exports = router;
