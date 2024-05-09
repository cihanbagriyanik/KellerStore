"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const category = require("../controllers/category.controller");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//! URL: /category
router.route("/").get(category.list).post(category.create);

router
  .route("/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
