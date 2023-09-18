const express = require('express')
const router = express.Router()
const logoutEndpointController = require('../controllers/logoutController')
const {jwtCheck} = require('../middlewares/jwtCheck')

router.post('/', jwtCheck, logoutEndpointController.index) 

module.exports = router