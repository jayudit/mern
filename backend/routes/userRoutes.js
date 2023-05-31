const express = require('express') //bring in express
const router = express.Router() //create a router via express
const { registerUser, loginUser, getMe } = require('../controllers/userController') //bring in the userController functions
const {protect} = require('../middleware/authMiddleware')

//Register
router.post('/', registerUser)
//Login
router.post('/login', loginUser)
//Get User Info
router.get('/me', protect, getMe)

module.exports = router