import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setVoteMessage, hideNotif } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  return (
    props.anecdotes
      .sort((a, b) => b.votes-a.votes)
      .filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button 
              onClick={() => {
                props.voteAnecdote(anecdote.id)
                props.setVoteMessage(anecdote.content)
                setTimeout(() => {
                  props.hideNotif()
                }, 3000)
              }}
            >
              vote
            </button>
          </div>
        </div>
      )
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {setVoteMessage, hideNotif, voteAnecdote})(AnecdoteList)
export default ConnectedAnecdoteList;