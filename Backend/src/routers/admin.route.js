"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Address:

const Address = require("../controllers/adress.controller");

// URL: /Addresss

const { isAdmin } = require("../middlewares/permissions");
const user = require('../controllers/user.controller');

// all request isAdmin
// router.use(isAdmin);

router.route("/").get(isAdmin,user.list).post(isAdmin, user.create);


/* ------------------------------------------------------- */
module.exports = router;
