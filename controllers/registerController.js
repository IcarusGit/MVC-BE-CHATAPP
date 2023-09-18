const DB = require('../models')

exports.index = async (req, res) => {

    const isExisting = await DB.registeredUsers.findOne({username: req.body.username})

    if (isExisting != null){
        res.send({
            message: "Username is already existing!",
            status: false
        })

        return false
    }

    res.send({
        message: "User Successfully Created",
        status: true
    }) 
}