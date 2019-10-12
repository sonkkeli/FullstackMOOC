import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import anecReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecReducer,
  notifications: notifReducer,
  filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store