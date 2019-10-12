import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anService from './services/anecdotes'
import {initialize} from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    anService.getAll().then(a => props.initialize(a))
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initialize })(App)