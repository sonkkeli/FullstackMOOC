const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      var temp = state.good
      return {...state, good: temp+1}
    case 'OK':
      var temp2 = state.ok
      return {...state, ok: temp2+1}
    case 'BAD':
      var temp3 = state.bad
      return {...state, bad: temp3+1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer