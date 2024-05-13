"use strict"

const router = require('express').Router();

// routes/user:
const { isAdmin, isLogin } = require('../middlewares/permissions');
const user = require('../controllers/user.controller');

// URL: /users
router.route('/')
  .get(isLogin, isAdmin, user.list)
  .post(user.create);

router.route('/:id')
  .get(isLogin, user.read)
  .put(isLogin, user.update)
  .delete(isLogin, user.delete);

module.exports = router;
