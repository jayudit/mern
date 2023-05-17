const express = require('express') // importing back-end web framework
const dotenv = require('dotenv').config() //allows for .env file with variables
const{errorHandler} = require('./middleware/errorMiddleware') //bringing in the error handler errorMiddleware.js
const port = process.env.PORT || 5000   // port for server

const app = express() // init express by creating a variable called app and setting it to express

app.use(express.json()) // to use body data for post requests via express body parser 
app.use(express.urlencoded({extended: false})) //past object with extended = false

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler) // ask app server to override default express error handler

app.listen(port, () => console.log(`Server started on port ${port}`)) // express listen on port passed in parameters