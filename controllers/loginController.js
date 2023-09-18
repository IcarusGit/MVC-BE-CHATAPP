const DB = require('../models')
const jwt = require('jsonwebtoken')

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
}