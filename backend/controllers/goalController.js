const asyncHandler = require('express-async-handler') //bringing in the express async handler
const Goal = require('../models/goalModel') //bring in the goalModel -- this will have a bunch of mongoose methods to create, read etc.
const User = require('../models/userModel') //bring in the userModel 

// @ desc Get goals
// @ route GET /api/goals
// @ access  Private

const getGoals = asyncHandler(async(req, res) => {               //adding async will make sure that the asynchronouse operation finishes running before proceeding (like querying a database or making a HTTP req)
    const goals = await Goal.find({ user: req.user.id}) //declare a variable called goals that finds goals from the database using the.find method in mongoose

    res.status(200).json(goals) //return goals
})

// @ desc Set goal
// @ route POST /api/goals
// @ access  Private

const setGoal =  asyncHandler(async(req, res) => {
    if(!req.body.text) {   //if the requests body doesn't contain a body text field then throw a 400 response
        res.status(400)   // res status 400
        throw new Error('Please add a text field') //express's built in error handler
    }

    //if the body does contain a text field
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})


// @ desc Update goal
// @ route PUT /api/goals/:id
// @ access  Private

const updateGoal =  asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id) //get the goal we are trying to update by ID and throw an error if not found

    if(!goal) { //if goal is not found
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id) //req.user.id is the logged in users id. Set user = logged in user

    //check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // if goal is found then update that user's goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true,}) //first arg: id, second arg: updated body pulled from the req in PUT req, third arg: new = true create if it doesnt exist
    res.status(200).json(updatedGoal)
})


// @ desc Delete goal
// @ route DELETE /api/goals/:id
// @ access  Private

const deleteGoal =  asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id) //get the goal we are trying to delete by ID

    if(!goal) { //if goal is not found
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id) //req.user.id is the logged in users id. Set user = logged in user

    //check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // if goal is found then delete goal
    await goal.deleteOne()
    res.status(200).json({id: req.params.id})
})



module.exports = {
    getGoals, 
    setGoal,
    updateGoal,
    deleteGoal
}
