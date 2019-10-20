import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthYear from './components/SetBirthYear'
import LoginForm from './components/LoginForm'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, EDIT_AUTHOR, LOGIN } from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('library-token', token))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-token')
    client.resetStore()
  }

  const createNotification = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const saveToken = (token) => {
    setToken(token)
  }

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: createNotification,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: createNotification,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [ login ] = useMutation(LOGIN, {
    onError: createNotification
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token 
        ? (
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('edit')}>set born</button>
            <button onClick={logout}>logout</button>
          </span>
        )
        : <button onClick={() => setPage('login')}>login</button>
        }        
      </div>

      <p style={{color: 'red', fontWeight: '600'}}>{errorMessage}</p>

      <Authors 
        authors={useQuery(ALL_AUTHORS)}
        show={page === 'authors'}
      />

      <Books 
        books={useQuery(ALL_BOOKS)}
        show={page === 'books'}
      />

      <NewBook 
        addBook={addBook}
        show={page === 'add'}
        createNotification={createNotification}
      />

      <SetBirthYear
        editAuthor={editAuthor}
        authors={useQuery(ALL_AUTHORS)}
        show={page === 'edit'}
      />

      <LoginForm
        login={login}
        saveToken={saveToken}
        createNotification={createNotification}
        show={page === 'login'}
      />

    </div>
  )
}

export default App