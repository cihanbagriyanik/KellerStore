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
router.use("/admin", require("./admin.route"));

//add
router.use("/ad", require("./ad.route"));

//mesaj

router.use("/messages", require("./message.route"));

// address:
router.use("/address", require("./address.route"));

// category:
router.use("/category", require("./category.route"));

// favorite:
router.use("/favorite", require("./favorite.route"));

// follow:
router.use("/follow", require("./follow.route"));

// notification:
router.use("/notification", require("./notification.route"));

// document:
router.use("/documents", require("./document.route"));
//category
router.use("/category", require("./category.route"));

/* -------------------------------------------------------------------------- */
module.exports = router;
