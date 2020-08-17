import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotelist from './components/Anecdotelist'
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <Notification />
      <AnecdoteForm />
      <Anecdotelist />
    </div>
  )
}

export default App