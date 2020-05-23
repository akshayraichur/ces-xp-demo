const express = require('express')
const router = express.Router();

const UserController = require('../controllers/UserController')

router.get('/get-creator/:creator', UserController.getCreatorDetails)



module.exports = router;