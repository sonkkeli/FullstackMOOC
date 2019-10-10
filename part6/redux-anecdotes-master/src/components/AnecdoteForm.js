import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {

  const addAnec = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    store.dispatch(
      createAnecdote(content)
    )
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