"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const category = require("../controllers/category.controller");
const { isAdmin, isLogin } = require("../middlewares/permissions");
/* -------------------------------------------------------------------------- */
//! URL: /category

router.get("/", category.list);
router.post("/", category.create);
router.get("/:id", category.read);
router.put("/:id", isLogin, isAdmin, category.update);
router.delete("/:id",  category.delete);
router.get("/search", category.enhancedSearch);

/* -------------------------------------------------------------------------- */
module.exports = router;