import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecReducer,
  notifications: notifReducer,
  filter: filterReducer
})

const store = createStore(reducer)
console.log(store.getState())

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)