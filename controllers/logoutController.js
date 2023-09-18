const DB = require('../models')

exports.index = async (req, res) => {
    const blacklistedtoken = new DB.blackListedTokens({
        token: req.token
    })
    await blacklistedtoken.save()
    
    res.send({ 
        message: "Logged out",
        username: req.user.username
    })
}