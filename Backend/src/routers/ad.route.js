"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const ad = require("../controllers/ad.controlller");

const { isAdmin, isLogin } = require("../middlewares/permissions");
const upload = require("../middlewares/upload");
/* -------------------------------------------------------------------------- */
//! URL: /ad
router.route("/").get(ad.list).post(upload.array("images", 5), ad.create);
router.route("/neue").get(ad.neue);
router.route("/view").get(ad.view);
router.route("/favorite/:id").post(ad.favorite);
router.route("/reserve/:id").put(ad.reserve);

router
  .route("/:id")
  .get(ad.read)
  .put(isLogin, upload.array("images", 5), ad.update)
  .patch(isLogin, upload.array("images", 5), ad.update)
  .delete(ad.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
