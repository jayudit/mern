// A script to connect to the MongoDB database via mongoose
const mongoose = require('mongoose')

const connectDB = async() => {    //connect async function -- mongoose methods are async and return a promise
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)  //code that might throw an exception //declare and const conn that waits for mongoose.connect to run
        
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline); //if it runs succesfully, print this to console
    } catch (error){
        console.log(error);
        process.exit(1) // if there is an error, close the process with status code 1
    }
} 

module.exports = connectDB