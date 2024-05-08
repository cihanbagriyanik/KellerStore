"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const ad = require("../controllers/ad");

const permissions = require("../middlewares/permissions");
const upload = require("../middlewares/upload")
/* -------------------------------------------------------------------------- */
//! URL: /ad
router.route("/")
.get(ad.list)
.post(permissions.isLogin,upload.array("ad",5)  ,ad.create);

router.route("/favorite/:id")
.post(ad.favorite)

router
  .route("/:id")
  .get(ad.read)
  .put(ad.update)
  .patch(ad.update)
  .delete(ad.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
