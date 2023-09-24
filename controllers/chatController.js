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
    const existingConversation = await DB.conversations.findOne({ conversing: {$all: [req.body.talkingto, req.user.username]} })
    if (existingConversation != null) {
        res.send({
            message: "Existing conversation found",
            currentlyLoggedIn: req.user.username //username in jwt nakasave dun yung curerntly logged in
        });
    } 
    else {        
        const conversation = new DB.conversations({        
            conversing: [req.body.talkingto, req.user.username]           
        })

        conversation.save()
    
        res.send({
            message: "A new conversation has been created",
            currentlyLoggedIn: req.user.username
        });
    }    
}

//get    /chat/:username
exports.fetchConvo = async (req, res) => {
    const conversation = await DB.conversations.findOne({ conversing: {$all: [req.params.username, req.user.username]} })
    //console.log(conversation)
    res.send({
        convo: conversation
    })
}
//post   /chat/:username
exports.addToAnExistingConvo = async (req, res) => {
    // const conversation = await DB.conversations.findOne({ conversing: {$all: [req.params.username, req.user.username]} })
    const convo = {
        content: req.body.content,
        sender: req.user.username
    }

    //NEW: TRUE is user to return the updated document
    const conversation = await DB.conversations.findOneAndUpdate({ conversing: { $all: [req.params.username, req.user.username] } }, { $push: { messages: convo } },{ new: true});
    if (conversation){
        res.send({
            result: "Message sent successfully",
            content: req.body.content,
            sender: req.user.username
        })
    } else {
        res.status(404).send({error: "Conversation not found"})
    }
}