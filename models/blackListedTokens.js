const mongoose = require('mongoose')

const blackListedTokensSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('blackListedTokens', blackListedTokensSchema)