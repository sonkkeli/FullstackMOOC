import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotif } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const addAnec = (event) => {
    event.preventDefault()
    store.dispatch(createAnecdote(event.target.content.value))
    setTimeout(() => {
      store.dispatch(hideNotif())
    }, 3000)
    event.target.content.value = ''
  }
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnec}>
          <div><input name="content"/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm;