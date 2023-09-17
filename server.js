// const jwt = require('jsonwebtoken');
// var cors = require('cors')

// const express = require('express')
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();

// const httpServer = createServer(app);
// const io = new Server(httpServer , {
//     cors: {
//         origin: "*"
//     }
// });

// app.use(cors())
// app.use(express.json())



// // Tell express to run at port 3002
// httpServer.listen(3002, () => {
//     console.log(`Application runnning at port 3002`)
// })
//===============================================================================

// Express configuration
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')
const DB = require('./models')//I FETCH ALL THE DATAS THAT ARE FOR THE DATABASE SO THAT I CAN CONNECT TO THE DB HERE IN THE SERVER FILE OR MAIN FILE


const giveAllRoutes = require('./routes')
giveAllRoutes(app)

DB.mongoose.connect(DB.url).then(async (res) => {
    console.log(` Runtime: Connected to ${ res.connections[0]['_connectionString'].includes('localhost') ? "localhost" : "ATLAS" } MongoDB`)

    // async function findRegisteredUsers() {
    //     const users = await DB.registeredUsers.find();
    //     const username = users.map(user => user.username)

    //     console.log(username)
    // }
}).catch((err) => {
    console.log(err)
})






app.listen(3002, () => {
    console.log(`Application runnning at port 3002`)
})