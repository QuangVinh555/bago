const Conversation = require('../models/Conversation');

const ConversationControllers = {
    //[POST] /api/conversation
    createConversation: async(req, res) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiveId],
        });
        try {
            const savedConversation = await newConversation.save();
            return res.status(200).json(savedConversation);;
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //[GET] /api/conversation/:senderId
    getConversation: async(req, res) => {
        try {
            const conversation = await Conversation.find({
                members: {$in: [req.params.senderId]}
            })
            return res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //[GET] /api/conversation/find/:firstUserId/:secondUserId
    getIncludesConversations: async(req, res) => {
        try {
            const conversation = await Conversation.findOne({
                members: {$all: [req.params.firstUserId, req.params.secondUserId]}
            });
            return res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = ConversationControllers;