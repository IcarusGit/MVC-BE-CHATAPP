const mongoose = require('mongoose')

const blackListedTokensSchema = new mongoose.Schema({
    token: Object
})

module.exports = mongoose.model('blackListedTokens', blackListedTokensSchema)