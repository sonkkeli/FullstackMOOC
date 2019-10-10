import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({store}) => {  
  return (
    store.getState().sort((a, b) => b.votes-a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button 
            onClick={() => store.dispatch(voteAnecdote(anecdote.id))}
          >
            vote
          </button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList;