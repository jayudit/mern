// The service is strictly for making the HTTP request and sending  data back

import axios from 'axios' //just like using POSTMAN but within our application

const API_URL = '/api/users/' //the url endpoint making requests to

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) { //if response is not empty
        //set localstorage
        localStorage.setItem('user', JSON.stringify(response.data)) //must pass through stringify because you can only put strings in local storage //response.data will include our token
    }

    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) { //if response is not empty
        //set localstorage
        localStorage.setItem('user', JSON.stringify(response.data)) //must pass through stringify because you can only put strings in local storage //response.data will include our token
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
} 


const authService = {
    register,
    logout,
    login,
}

export default authService