"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Address:

const Address = require("../controllers/address");

// URL: /Addresss

const { isAdmin } = require("../middlewares/permissions");

// all request isAdmin
// router.use(isAdmin);

router.route("/").get(Address.list).post(isAdmin, Address.create);

router
  .route("/:id")
  .get(Address.read)
  .put(isAdmin, Address.update)
  .patch(isAdmin, Address.update)
  .delete(isAdmin, Address.delete);

/* ------------------------------------------------------- */
module.exports = router;
