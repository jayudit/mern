// Define the schema and fields for this particular (goals) resource
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({ //create a schema and set it to a constant // use mongoose.Schema and pass an object in with the fields for the resource you want to create schema for
    user: { //add a field to relate each goal to a user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // refer to to the User Model
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
}, { 
    //pass another object called timestamps
    timestamps: true //creates an updated at and created at field 
})

module.exports = mongoose.model('Goal', goalSchema ) //Export a model named goal that takes in the goalSchema