"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const follow = require("../controllers/follow");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//! URL: /follow
router.route("/").get(follow.list).post(follow.create);

router
  .route("/:id")
  .get(follow.read)
  .put(follow.update)
  .patch(follow.update)
  .delete(follow.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
