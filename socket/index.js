const io = require('socket.io')(8900,{
    cors: {
        origin: 'http://localhost:3000'
    }
});

let users = [];
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
    users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user=>user.userId === userId)
}

io.on("connect", (socket) => {
    // connect
    console.log("a user connected");

    // add user
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        console.log("user:",users)
        io.emit("getUsers", users);
    });
    // send messenger
    socket.on("sendMessage", ({senderId, receiveId, text}) => {
        const user = getUser(receiveId);
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text        
        }); 
        console.log(user);
    });

    // like
    socket.on("like", ({senderId, receiveId}) => {
        const user = getUser(receiveId);
        socket.to(user?.socketId).emit("getNotify", {
            senderId,
        })
    })

    // disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});
