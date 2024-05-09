"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Favorite:

const Favorite = require("../controllers/favorite.controller");

// URL: /Favorites

const { isAdmin } = require("../middlewares/permissions");

// all request isAdmin
// router.use(isAdmin);

router.route("/").get(Favorite.list).post(isAdmin, Favorite.create);

router
  .route("/:id")
  .get(Favorite.read)
  .put(isAdmin, Favorite.update)
  .patch(isAdmin, Favorite.update)
  .delete(isAdmin, Favorite.delete);

/* ------------------------------------------------------- */
module.exports = router;
