import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import React from 'react'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import {getGoals} from '../features/goals/goalSlice'
import {reset} from '../features/auth/authSlice'

function Dashboard() {
  const navigate = useNavigate() //initialize navigate
  const dispatch = useDispatch() //initialize dispatch

  const {user} = useSelector((state) => state.auth) //get the user from the auth part of the state
  const {goals, isLoading, isError, message} = useSelector((state)=> state.goals) //goals contains the goals


  useEffect(() => { //takes in a function and dependency array
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate('/login')
    }

    dispatch(getGoals()) //dispatch get Goals - will fetch the goals from backend and put in const goals and we will have access to it to use below

    return () => {
      dispatch(reset())
    }
  },[user, navigate, isError, message, dispatch]) //dependency array

  if(isLoading){
    return <Spinner />
  }

  return (
  <>
  <section className="headinn">
    <h1> Welcome {user && user.name}</h1>
    <p>Goals Dashboard</p>
  </section>

  <GoalForm />
    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key = {goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3> You have not set any goals </h3>)}
   </section>
  </>
  )
}

export default Dashboard
