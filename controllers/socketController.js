const DB = require('../models')
const altOnlineUser = require('../helpers/onlineusers')

const { io } = require('../initiateIO');


exports.socketConnection = (socket) => {
    function createChatRoom(user1, user2) {
        const roomName = [user1, user2].sort().join('_');
        socket.join(roomName)
        return roomName
    }
    
    socket.on("sign_in", (data) => {  
        if (!Object.values(altOnlineUser).includes(data.username)){
            altOnlineUser[socket.id] = data.username //to replace online users container
        }
        console.log(altOnlineUser)

        io.emit("signin_update", {
            onlineUsers : Object.values(altOnlineUser)            
        })
    })

    socket.on("logging_in", (data) => {
        if (!Object.values(altOnlineUser).includes(data.username)){
            altOnlineUser[socket.id] = data.username //to replace online users container
        }
        console.log(altOnlineUser)
        io.emit("signin_update", {
            onlineUsers : Object.values(altOnlineUser)            
        })
    })

    socket.on("chat",async (data) => {   
        const conversation = await DB.conversations.findOne({ conversing: {$all: [data.sender, data.receiver]} })

        const roomname = createChatRoom(data.sender, data.receiver);

        if (conversation) {
            const convo = {
                content: data.content,
                sender: data.sender
            }

            // await DB.conversations.findOneAndUpdate({ _id: conversation._id },{ $push: { messages: convo } },{ new: true })

            // DB.conversation
        
            // conversation.messages.push(convo);
            
            io.to(roomname).emit("addChat", {
                convo: convo
            });
        }
    })

    socket.on("join_room", (data) => {
        const roomName = [data.sender, data.receiver].sort().join('_');
        socket.join(roomName)        
    })

    socket.on("registered", async (data) => {
        const newUser = new DB.registeredUsers({
            username: data.username,
            password: data.password
        })
        await newUser.save()
        
        const registeredUsers = await DB.registeredUsers.find()
        const mapregisteredUsers = registeredUsers.map(user => {
            return {
                username: user.username
            };
        });
        console.log(mapregisteredUsers)

        io.emit("allUsers", {mapregisteredUsers: mapregisteredUsers})
    });

    socket.on("logout", (data) => {
        console.log(socket.id)// socket.id
        const socketID = Object.keys(altOnlineUser).find(key => altOnlineUser[key] === data.username);
        
        delete altOnlineUser[socketID]

        console.log(altOnlineUser)
        io.emit("signin_update", {
            onlineUsers : Object.values(altOnlineUser)
        })
    })

    socket.on('disconnect', () => {
        console.log(socket.id)
        delete altOnlineUser[socket.id]

        console.log(altOnlineUser)
        io.emit("signin_update", {
            onlineUsers: Object.values(altOnlineUser)
        })
    })
}