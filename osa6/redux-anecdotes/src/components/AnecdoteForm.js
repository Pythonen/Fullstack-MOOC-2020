import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from "react-redux";
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const ane = event.target.anecdote.value
        dispatch(createAnecdote(ane))
        dispatch(
            setNotification({
              message: `Successfully added anecdote`,
            })
          )
          setTimeout(() => {
            dispatch(removeNotification());
          }, 5000);
        event.target.anecdote.value = ''
    }
      
    return(
        <>
            <h2>create new</h2>
                <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm