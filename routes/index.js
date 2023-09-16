const express = require('express')
const router = express.Router()

const giveAllRoutes = (app) => {
    router.use('/chat', require('./chat'))

    return app.use('/', router)
}

module.exports = giveAllRoutes