"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const ad = require("../controllers/ad");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//! URL: /ad
router.route("/")
.get(ad.list)
.post(permissions.isLogin,ad.create);

router
  .route("/:id")
  .get(ad.read)
  .put(ad.update)
  .patch(ad.update)
  .delete(ad.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
