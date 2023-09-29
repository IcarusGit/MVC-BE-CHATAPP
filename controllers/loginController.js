const DB = require('../models')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
// const {app} = require('../initiateIO')
// app.use(cookieParser())


exports.index = async (req, res) => {
    const currentuser = await DB.registeredUsers.findOne({username: req.body.username, password: req.body.password})
    if (currentuser != null){

        // Get the user information
        const user = { 
            username: currentuser.username,
            status: currentuser.status 
        }

        // Encode your JWT
        let token = jwt.sign(user, 'SECRET_PASSWORD');
        
        // iset ang cookie into httpOnly: true para di siya maaccess sa front end bale para siyang invisible di makikita sa inspect ng front end pero unique parin siya sa browser lang
        // res.cookie('cookie', currentuser.username, )
        // send to logged in users
        res.send({
            message: "Logged in",
            status: true,
            username: req.body.username,
            token: "Bearer " + token, // Send token and other data
            cookie: req.cookies.cookie 
        });
    }

    //if wrong username or pw
    else {
        res.send({
            message: "Invalid username or password",
            status: false
        });
    }   
}