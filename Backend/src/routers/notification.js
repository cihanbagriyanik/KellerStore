"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const notification = require("../controllers/notification");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//! URL: /notification
router.route("/").get(notification.list).post(notification.create);

router
  .route("/:id")
  .get(notification.read)
  .put(notification.update)
  .patch(notification.update)
  .delete(notification.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
