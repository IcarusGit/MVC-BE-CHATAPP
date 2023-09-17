const DB = require('../models')

//get
exports.showUsers = async (req, res) => {
    const registeredUsers = await DB.registeredUsers.find()
    const mapregisteredUsers = registeredUsers.map(user => {
        return {username: user.username}
    })
    res.send({
        users: mapregisteredUsers,
        currentlyLoggedIn: req.user.username,
        message: "Valid Token"
    })
}

//post
exports.newOrExistingConvo = async (req,res) => {
    
    const conversations = await DB.conversations.find()
    // Check if an existing conversation already exists and returns its index
    const existingConversation = conversations.find(convo => convo.conversing.includes(req.body.talkingto) && convo.conversing.includes(req.user.username))
    
    if (existingConversation) {
        res.send({
            message: "Existing conversation found",
            currentlyLoggedIn: req.user.username //username in jwt nakasave dun yung curerntly logged in
        });
    } 
    else {
        const newConvo ={
            conversing: [req.body.talkingto, req.user.username],
            messages: []
        }
    
        conversations.push(newConvo);
    
        res.send({
            message: "A new conversation has been created",
            currentlyLoggedIn: req.user.username
        });
    }
}