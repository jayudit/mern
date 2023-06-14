import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

//create an initial state for goals
// an object with goals array

const initialState = {
    goals: [],
    //every redux resource we have will have these
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


//create new goal
// ThunkAPI object has a get state method to get the state of any resource
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => { //asyncThunk takes in action name goals/create + async function taking in the goaltext
    try { //await goalService
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token) //goalService will have a function called createGoal that takes in goalData and token
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
}) 

//get user goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => { //not passing anything in just getting goals so use underscore as first argument
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

// Delete user Goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => { //asyncThunk takes in action name goals/create + async function taking in the goaltext
    try { //await goalService
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token) //goalService will have a function called deleteGoal that takes in goalData and token
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
}) 

//create the GoalSlice
export const goalSlice = createSlice({ //createSlice takes in an object
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState //if we dispatch the reset function, it will change to initial states.
    },
    //add in extraReducers: function that takes in builder
    extraReducers: (builder) => {
        builder
        .addCase(createGoal.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload) //action.payload is the new goal that we created
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload //what is action.payload
        }) 
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter((goal)=> goal._id !== action.payload.id) //action.payload.id is the id of the goal we delete. showing goals that are not equal to the deleted goal
        }) 
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer