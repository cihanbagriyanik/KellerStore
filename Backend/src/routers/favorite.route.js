"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Favorite:

const Favorite = require("../controllers/favorite.controller");

// URL: /Favorites

const { isAdmin, isLogin } = require("../middlewares/permissions");

// all request isAdmin
// router.use(isAdmin);
router.route("/")
.get(isAdmin,Favorite.list)
.route("/belibt").get(Favorite.belibt)
.post(isLogin, Favorite.create);
router
  .route("/:id")
  .get(Favorite.read)
  .put(isAdmin, Favorite.update)
  .patch(isAdmin, Favorite.update)
  .delete(isAdmin, Favorite.delete);

/* ------------------------------------------------------- */
module.exports = router;
