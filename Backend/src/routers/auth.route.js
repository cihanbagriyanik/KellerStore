"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const auth = require("../controllers/auth.controller");

/* -------------------------------------------------------------------------- */
//! URL: /auth
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/refresh", auth.refresh);
router.post("/forgot",auth.forgot);
router.post("/reset",auth.reset);
router.post("/gofatel", auth.gofatel);
router.get("/logout", auth.logout);

/* -------------------------------------------------------------------------- */
module.exports = router;
