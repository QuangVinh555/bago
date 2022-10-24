const express = require('express');
const ConversationControllers = require('../controllers/ConversationControllers');
const router = express.Router();

router.post('/', ConversationControllers.createConversation);
router.get('/:senderId', ConversationControllers.getConversation);
router.get('/find/:firstUserId/:secondUserId', ConversationControllers.getIncludesConversations);

module.exports = router;