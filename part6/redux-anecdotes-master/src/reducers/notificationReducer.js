const notifReducer = (state = 'HIDDEN', action) => {
  switch (action.type) {    
    case 'ADD':
      return `you added new anecdote: ${action.data.content}`
    case 'SET_VOTE_MSG':
      return `you voted: ${action.data.content}`
    case 'HIDE':
      return 'HIDDEN'
    default: return state
  }
}
export const hideNotif = () => {
  return {
    type: 'HIDE'
  }
}

export const setVoteMessage = (content) => {
  return {
    type: 'SET_VOTE_MSG',
    data: { content }
  }
}

export default notifReducer