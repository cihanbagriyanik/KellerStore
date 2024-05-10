"use strict";

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');

// Route to handle GET requests for all messages, access control depends on user role
router.get('/', isLogin, messageController.list);

// Route to handle POST requests to create a new message, only logged-in users can create messages
router.post('/', isLogin, messageController.create);

// Route to handle GET requests for a specific message by id, access control depends on user role
router.get('/:id', isLogin, messageController.read);

// Route to handle PUT requests to update a specific message by id, only the message sender or admin can update the message
router.put('/:id', isLogin, messageController.update);

// Route to handle DELETE requests to delete a specific message by id, only the message sender or admin can delete the message
router.delete('/:id', isLogin, messageController.delete);

module.exports = router;