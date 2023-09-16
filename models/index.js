const mongoose = require('mongoose')

const DB = {}
DB.mongoose = mongoose
DB.url = "mongodb+srv://basteforcoding123:a4Kl9C8qyv22LjCV@myfirstcluster.qoarsvd.mongodb.net/?retryWrites=true&w=majority"
DB.conversations = require('./conversations')
DB.registeredUsers = require('./registeredusers')
DB.blackListedTokens = require('./blackListedTokens')



module.exports = DB