const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    conversing: [String],
    messages:[{content: String, sender: String}]
})

module.exports = mongoose.model('conversation', conversationSchema)

// const conversation = new DB.conversations({
    
//     conversing: ['me', 'you'],
//     messages:  [{
//         content: "hello hello",
//         sender: "from yours truly"
//     },
//     {
//         content: "bfgsfgsf",
//         sender: "sfbgssersvgresg"
//     }]
    
// })

// conversation.save()