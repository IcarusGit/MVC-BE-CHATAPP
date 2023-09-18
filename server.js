const { cors, express, app, createServer, Server, httpServer, io } = require('./initiateIO');

app.use(cors())
app.use(express.json())

//=========================================
const mongoose = require('mongoose')
const DB = require('./models')//I FETCH ALL THE DATAS THAT ARE FOR THE DATABASE SO THAT I CAN CONNECT TO THE DB HERE IN THE SERVER FILE OR MAIN FILE
//=========================================
const { socketConnection } = require('./controllers/socketController')
io.on("connection", socketConnection)
//=========================================
const giveAllRoutes = require('./routes')
giveAllRoutes(app)
//=========================================


DB.mongoose.connect(DB.url).then(async (res) => {
    console.log(` Runtime: Connected to ${ res.connections[0]['_connectionString'].includes('localhost') ? "localhost" : "ATLAS" } MongoDB`)

}).catch((err) => {
    console.log(err)
})

httpServer.listen(3002, () => {
    console.log(`Application runnning at port 3002`)
})
