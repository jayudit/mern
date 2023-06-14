import axios from 'axios'

//API URL for this Goals
const API_URL = '/api/goals/'

//create new goal
// create goal is an async function taking in GoalData and token
const createGoal = async(goalData, token) => {
    const config = { //create a variable config
        //object with headers
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    //for response response await axios POST request 
    const response = await axios.post(API_URL, goalData, config) //POST parameters (URL, data, config with token)

    return response.data
}

//Get user goals
const getGoals = async(token) => {
    const config = { //create a variable config
        //object with headers
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    //for response response await axios POST request 
    const response = await axios.get(API_URL, config) //GET parameters (URL, config with token)

    return response.data
}


//Delete user goal
const deleteGoal = async(goalId, token) => {
    const config = { //create a variable config
        //object with headers
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    //for response response await axios POST request 
    const response = await axios.delete(API_URL + goalId, config) //GET parameters (URL, config with token)

    return response.data
}


const goalService = { //set goalService to an object with the create goal function
    createGoal,
    getGoals,
    deleteGoal,
}

//allow us to export goalService and use it in other places within the application
export default goalService