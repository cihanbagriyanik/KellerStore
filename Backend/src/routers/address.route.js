"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Address:

const Address = require("../controllers/adress.controller");

// URL: /Addresss

const { isAdmin,isLogin } = require("../middlewares/permissions");

// all request isAdmin
// router.use(isAdmin);

router.route("/").get(isAdmin,Address.list).post(isLogin, Address.create);

router
  .route("/:id")
  .get(isLogin,Address.read)
  .put(isLogin, Address.update)
  .patch(isLogin, Address.update)
  .delete(isAdmin, Address.delete);

/* ------------------------------------------------------- */
module.exports = router;
