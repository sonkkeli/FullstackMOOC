import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setVoteMessage, hideNotif } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {  
  console.log('filter', store.getState().filter.filter)
  return (
    store.getState().anecdotes
      .sort((a, b) => b.votes-a.votes)
      .filter(a => a.content.toLowerCase().includes(store.getState().filter.toLowerCase()))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button 
              onClick={() => {
                store.dispatch(voteAnecdote(anecdote.id))
                store.dispatch(setVoteMessage(anecdote.content))
                setTimeout(() => {
                  store.dispatch(hideNotif())
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

export default AnecdoteList;