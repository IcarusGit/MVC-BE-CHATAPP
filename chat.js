// Express configuration
const jwt = require('jsonwebtoken');
var cors = require('cors')

const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer , {
    cors: {
        origin: "*"
    }
});

app.use(cors())

// Tell express to read JSON
// https://www.w3schools.com/js/js_json_intro.asp
app.use(express.json())

let registeredUsers = [
    { username: "seb", password: "seb" },
    { username: "bes", password: "bes" },
]
//let onlineUsers = []
const blackListedTokens = []
const conversations = []
const altOnlineUser = {}

// io.on("connection", myController.init)

// exports.init = function(socket){
//     socket.on
// }

io.on("connection", (socket) => {
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

    socket.on("chat", (data) => {   
        const conversation = conversations.find(convo => 
            convo.conversing.includes(data.sender) && convo.conversing.includes(data.receiver)
        );

        const roomname = createChatRoom(data.sender, data.receiver);

        if (conversation) {
            const convo = {
                content: data.content,
                sender: data.sender
            }
        
            conversation.messages.push(convo);
            
            io.to(roomname).emit("addChat", {
                convo: convo
            });
        }
    })

    socket.on("join_room", (data) => {
        const roomName = [data.sender, data.receiver].sort().join('_');
        socket.join(roomName)        
    })

    socket.on("registered", (data) => {
        registeredUsers.push({
            username: data.username,
            password: data.password
        });
      
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
        // const usernameIndex = onlineUsers.indexOf(data.username);
    
        // // If the username is found in the array, remove it
        // if (usernameIndex !== -1) {
        //     onlineUsers.splice(usernameIndex, 1);
        // }
        delete altOnlineUser[socketID]

        console.log(altOnlineUser)
        io.emit("signin_update", {
            onlineUsers : Object.values(altOnlineUser)
        })
    })

    socket.on('disconnect', (data) => {
        console.log(socket.id)
        delete altOnlineUser[socket.id]

        console.log(altOnlineUser)
        io.emit("signin_update", {
            onlineUsers: Object.values(altOnlineUser)
        })
    })
});



// JWT Authentication
function jwtCheck(req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    
    jwt.verify(token, 'SECRET_PASSWORD', (err, decoded) => {
        req.user = decoded;
        req.token = token
        if( err || blackListedTokens.includes(token) ){
            const socketID = Object.keys(altOnlineUser).find(key => altOnlineUser[key] === req.user.username);
            if (Object.values(altOnlineUser).includes(req.user.username)){    
                delete altOnlineUser[socketID]
            }

            return res.status(401).send({
                message: "Invalid token"
            })
        }
        
        next();
    });
}

app.get('/tokenCheck', jwtCheck, (req, res) => {
    res.send({
        message: "Valid Token",
        currentUser: req.user.username
    })
})

app.post('/register', (req, res) => {
    const isExisting = registeredUsers.some(users => users.username === req.body.username)

    if (isExisting){
        res.send({
            message: "Username is already existing!",
            status: false
        })

        return false
    }

    const newUser = {
        username: req.body.username,
        password: req.body.password
    }

    res.send({
        message: "User Successfully Created",
        status: true
    }) 
})

app.post('/login', (req, res) => {
    const userIndex = registeredUsers.findIndex(user => (user.username === req.body.username) && (user.password === req.body.password))

    if (userIndex !== -1){
        const currentuser = registeredUsers[userIndex]

        // Get the user information
        const user = { 
            username: currentuser.username,
            status: currentuser.status 
        }

        // Encode your JWT
        var token = jwt.sign(user, 'SECRET_PASSWORD');

        // send to logged in users
        res.send({
            message: "Logged in",
            status: true,
            username: req.body.username,
            token: "Bearer " + token // Send token and other data
        });
    }

    //if wrong username or pw
    else {
        res.send({
            message: "Invalid username or password",
            status: false
        });
    }    
})

//load the registered users to the front end
app.get('/chat', jwtCheck, (req, res) => {
    // get the username only, to hide showing the password in the front end
    const mapregisteredUsers = registeredUsers.map(user => {
        return {
            username: user.username
        };
    });
    res.send({
        users: mapregisteredUsers,
        currentlyLoggedIn: req.user.username,
        message: "Valid Token"
    })
})

// New or existing convo
app.post('/chat', jwtCheck, (req, res) => {
    // Check if an existing conversation already exists and returns its index
    const existingConversation = conversations.find(convo =>
        convo.conversing.includes(req.body.talkingto) && convo.conversing.includes(req.user.username)
    );

    if (existingConversation) {
        res.send({
            message: "Existing conversation found",
            currentlyLoggedIn: req.user.username //username in jwt nakasave dun yung curerntly logged in
        });
    } 
    else {
        const newConvo = {
            conversing: [req.body.talkingto, req.user.username],
            messages: []
        }
    
        conversations.push(newConvo);
    
        res.send({
            message: "A new conversation has been created",
            currentlyLoggedIn: req.user.username
        });
    }
});

//fetch convo of the two users conversing only
app.get('/chat/:username', jwtCheck, (req, res) => {    
    const conversation = conversations.find(convo =>
        convo.conversing.includes(req.params.username) && convo.conversing.includes(req.user.username)
    );

    res.send({
        convo: conversation
    });
});

// New message added to an existing conversation
app.post('/chat/:username',jwtCheck, (req, res) => { 
    // Find the relevant conversation
    const conversation = conversations.find(convo =>
        convo.conversing.includes(req.params.username) && convo.conversing.includes(req.user.username)
    );

    if (conversation) {
        res.send({ 
            result: "Message sent successfully",
            content: req.body.content,
            sender: req.user.username  
        });
    } else {
        res.status(404).send({ error: "Conversation not found" });
    }
});

app.post('/logout', jwtCheck, (req, res) => {
    blackListedTokens.push(req.token)

    res.send({ 
        message: "Logged out",
        username: req.user.username
    })
})

// Tell express to run at port 3002
httpServer.listen(3002, () => {
    console.log(`Application runnning at port 3002`)
})




/*
===========================================
function isOTPValid(otpData) {
  const otp = otpData.otp;
  const timestamp = otpData.timestamp;
  const currentTime = Date.now();
  const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Check if the OTP is correct and hasn't expired
  if (otp && (currentTime - timestamp <= expirationTime)) {
    return true; // OTP is valid
  }

  return false; // OTP is either incorrect or expired
}

// Example usage:
const otpData = generateOTP();
console.log(isOTPValid(otpData)); // This will print true if OTP is valid and not expired
===========================================
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const timestamp = Date.now(); // Store the current timestamp
  return { otp, timestamp };
}

// Example usage:
const otpData = generateOTP();
console.log(otpData.otp); // This will print the OTP
console.log(otpData.timestamp); // This will print the timestamp
===========================================
npm install nodemailer

const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        username: "basteforcoding123@gmail.com",
        password: "pwforcoding123"
    }
})

let emailContent = {
    from: "basteforcoding123@gmail.com",
    to: "",
    subject: "YOUR OTP FOR THE CHAT-APP",
    text: "TEST EMAIL NYENYENYENYE"
}

transporter.sendMail(emailContent, (err) => {
    if (err) {
        console.log("There is an ERROR sending in email!", err)
    }

    else {
        console.log("email has been SENT!")
    }
})

*/
