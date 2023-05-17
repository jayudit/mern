// the use of routers helps in organizing and modularizing your express application by separating route definitions into individual files or modules

const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const { set } = require('mongoose')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router

