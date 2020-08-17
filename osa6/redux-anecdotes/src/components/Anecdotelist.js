import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotelist = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = [...anecdotes]
    sortedAnecdotes.sort((a, b) => b.votes - a.votes)

  const voteId = (id) => {
    dispatch(vote(id))
    const goingToChange = anecdotes.find(an => an.id === id)
    dispatch(
        setNotification({ message: `You voted ${goingToChange.content}` })
        ,console.log('terrvte')
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteId(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotelist