const express = require('express')
const router = express.Router()
const loginEndpointController = require('../controllers/loginController')
//onst {jwtCheck} = require('../middlewares/jwtCheck')

router.post('/', loginEndpointController.index) 

module.exports = router