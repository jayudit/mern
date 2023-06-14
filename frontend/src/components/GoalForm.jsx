import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'
 

function GoalForm() {
    //add in piece of state for this form
  const [text, setText] = useState('')  

  const dispatch = useDispatch()

  const onSubmit = e => { //what does this do?
    e.preventDefault()

    //dispatch the creategoal function
    dispatch(createGoal({text})) //pass in an object with the text
    //clear the form
    setText('')
  }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Add Goal
                </button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm