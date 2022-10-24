const Message = require('../models/Message');

const MessageControllers = {
    // [POST] /api/message
    createMessage: async (req, res) => {
        try {
            if(!req.body.conversationId){
                return res.status(404).json("Loi khong co conversationId");
            }
            const newMessage = new Message({
                conversationId: req.body.conversationId,
                sender: req.body.sender,
                text: req.body.text
            })
            await newMessage.save();
            return res.status(200).json(newMessage);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //[GET] /api/message/:conversationId
    getMessage: async (req, res) => {
        try {
            const message = await Message.find({conversationId: req.params.conversationId});
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = MessageControllers;