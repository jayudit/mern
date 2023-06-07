import React from 'react'
import {useState, useEffect} from 'react' //useState allows form fields to have component level state
import {FaSignInAlt} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {useSelector, useDispatch} from 'react-redux' //useSelector is used to select something from the state //useDispatch to dispatch a function
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


function Login() {
  const [formData, setFormData] = useState({   //object formData and setFormData = State 1 for form
    email:'',
    password: '',
  })            

  //destructure the fields
  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector
  (
    (state) => state.auth
  )

  //takes in a bunch of dependencies
  useEffect(()=> {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) =>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className='heading'>
        <h1>
            <FaSignInAlt /> Login 
        </h1>
        <p>Login and start setting goals</p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                type="email" 
                className="form control" 
                id="email" 
                name='email' 
                value={email} 
                placeholder='Enter your email'
                onChange={onChange}
                />    
            </div>
            <div className="form-group">
                <input 
                type="password" 
                className="form control" 
                id="password" 
                name='password' 
                value={password} 
                placeholder='Enter password'
                onChange={onChange}
                />    
            </div>
            <div className="form-group">
                <button type="submit" className='btn btn-block'>Submit</button>
            </div>
        </form>
    </section>
  </>
}

export default Login