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

// ad:
router.use("/ad",require("./ad"));

// address:
router.use("/address",require("./address"));

// category:
router.use("/category",require("./category"));

// favorite:
router.use("/favorite",require("./favorite"));

// follow:
router.use("/follow",require("./follow"));

// message:
router.use("/message",require("./message"));

// notification:
router.use("/notification",require("./notification"));

// document:
router.use("/documents", require("./document"));

/* -------------------------------------------------------------------------- */
module.exports = router;
