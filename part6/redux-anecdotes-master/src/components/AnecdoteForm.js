import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotif } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value =''
    props.createAnecdote(content)
    setTimeout(() => {
      props.hideNotif()
    }, 3000)
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