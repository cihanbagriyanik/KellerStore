"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Address:

const Follow = require("../controllers/follow.controller");

// URL: /Addresss

const { isAdmin, isLogin } = require("../middlewares/permissions");

// all request isAdmin
// router.use(isAdmin);


router.get('/', isLogin, Follow.list);
router.get("/follower",isLogin,Follow.follower);
router.post('/', isLogin, Follow.create);


router.get('/:id', isLogin, Follow.read);

router.put('/:id', isLogin, Follow.update);

router.delete('/:id', isLogin, isAdmin, Follow.delete);

/* ------------------------------------------------------- */
module.exports = router;
