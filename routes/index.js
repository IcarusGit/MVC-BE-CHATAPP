const express = require('express')
const router = express.Router()

const giveAllRoutes = (app) => {
    router.use('/chat',            require('./chat'))
    router.use('/register',        require('./register'))
    router.use('/login',           require('./login'))
    router.use('/logout',          require('./logout'))
    router.use('/tokenCheck',      require('./tokenCheck'))

    return app.use('/', router)
}

module.exports = giveAllRoutes