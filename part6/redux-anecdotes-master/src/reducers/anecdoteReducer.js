export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: anecdote
  }
}

export const initialize = (data) => {
  return {
    type: 'INIT_ANECS',
    data
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {

    case 'INIT_ANECS':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecToVote = state.find(n => n.id === id)
      const changedAnec = {
        ...anecToVote,
        votes: anecToVote.votes +1
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec
      )

    case 'ADD':
      return [...state, action.data]

    default: return state
  }
}

export default reducer