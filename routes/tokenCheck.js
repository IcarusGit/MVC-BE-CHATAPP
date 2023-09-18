const express = require('express')
const router = express.Router()
const tokenCheckEndpointController = require('../controllers/tokenCheckController')
const {jwtCheck} = require('../middlewares/jwtCheck')

router.get('/', jwtCheck, tokenCheckEndpointController.index) 

module.exports = router