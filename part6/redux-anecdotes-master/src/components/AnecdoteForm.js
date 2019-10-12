import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotif } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnec = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.content.value)
    setTimeout(() => {
      props.hideNotif()
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

const ConnectedAnecdoteForm = connect(null, {hideNotif, createAnecdote})(AnecdoteForm)
export default ConnectedAnecdoteForm;