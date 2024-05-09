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
router.use("/auth", require("./auth.route"));

// token:
router.use("/tokens", require("./token.route"));

// user:
router.use("/users", require("./user.route"));

//add
router.use("/ad",require("./ad.route"));

//mesaj

router.use('/messages', require('./message.route'));

// document:
// router.use("/documents", require("./document"));

/* -------------------------------------------------------------------------- */
module.exports = router;
