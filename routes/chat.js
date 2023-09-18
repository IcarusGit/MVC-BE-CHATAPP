const express = require('express')
const router = express.Router()
const chatEndpointController = require('../controllers/chatController')
const {jwtCheck} = require('../middlewares/jwtCheck')

router.get('/', jwtCheck, chatEndpointController.showUsers)
router.post('/', jwtCheck, chatEndpointController.newOrExistingConvo)
router.get('/:username', jwtCheck, chatEndpointController.fetchConvo)
router.post('/:username', jwtCheck, chatEndpointController.addToAnExistingConvo)


module.exports = router