const userRouter = require('./users');
const authRouter = require('./auth');
const postRouter = require('./posts');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');

const route = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/conversation', conversationRouter);
    app.use('/api/message', messageRouter);
}

module.exports = route;