"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Message:

const Message = require("../controllers/message");

// URL: /Messages

const { isAdmin } = require("../middlewares/permissions");

// all request isAdmin
// router.use(isAdmin);

router.route("/").get(Message.list).post(isAdmin, Message.create);

router
  .route("/:id")
  .get(Message.read)
  .put(isAdmin, Message.update)
  .patch(isAdmin, Message.update)
  .delete(isAdmin, Message.delete);

/* ------------------------------------------------------- */
module.exports = router;
