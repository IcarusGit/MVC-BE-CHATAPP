const express = require('express')
const router = express.Router()
const registerEndpointController = require('../controllers/registerController')
//const {jwtCheck} = require('../middlewares/jwtCheck')

router.post('/', registerEndpointController.index) 

module.exports = router