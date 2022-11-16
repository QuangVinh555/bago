const express = require('express');
const MessageControllers = require('../controllers/MessageControllers');
const router = express.Router();

router.delete('/:id', MessageControllers.deleteMessage);
router.post('/', MessageControllers.createMessage);
router.get('/:conversationId', MessageControllers.getMessage);

module.exports = router;