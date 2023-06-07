import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' //helps handle asynchronous actions more efficiently
import authService  from './authService'

//Get user from localStorage //local storage can only have strings
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}


//Register user
//dispatch the register asyncThunk function
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user) //return the payload thats coming back from register function in authService with token etc.
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

//login user
//dispatch the login asyncThunk function
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user) //return the payload thats coming back from register function in authService with token etc.
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

//logout function
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})


//dispatch this function to reset the values back to default after registering
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  //reset the state to default values 
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message =  ''
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    },
})

export const {reset} = authSlice.actions //we can bring this reset function into components we want to use it
export default authSlice.reducer