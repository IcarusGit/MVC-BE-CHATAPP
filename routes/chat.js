const express = require('express')
const router = express.Router()
const chatEndpointController = require('../controllers/chatController')
const jwtCheck = require('../middlewares/jwtCheck')

//router.get('/', jwtCheck, )

module.exports = router