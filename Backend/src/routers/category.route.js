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
router.post("/", category.create)
router.get("/", category.list)

router
  .route("/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
