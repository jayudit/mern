// the use of routers helps in organizing and modularizing your express application by separating route definitions into individual files or modules
// path you use to make the request

const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const { set } = require('mongoose')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal) // route for GET AND POST
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal) //route for DELETE and PUT

module.exports = router

