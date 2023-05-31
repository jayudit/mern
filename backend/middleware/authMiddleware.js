// This middleware function will run during the request response cycle to check and verify the token
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next) => {
let token //declare token variable

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ //check if headers.authorization exists and starts with bearer
    try {
        //Get token from header 
        token = req.headers.authorization.split(' ')[1]

        //Verify token
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET) //decode the token by using jwt verify method

        //Get user from the token via ID using the decoded token and assign it to req.user
        req.user = await User.findById(decoded_token.id).select('-password')

        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
}
if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
}
})

module.exports = { protect }