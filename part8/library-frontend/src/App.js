import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthYear from './components/SetBirthYear'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ADD_BOOK = gql`
mutation addBook( $title: String!, $author: String!, $published: Int!, $genres: [String!]! ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`
const EDIT_AUTHOR = gql`
mutation editAuthor( $name: String!, $born: Int! ) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
    bookCount
  }
}
`

const App = () => {
  const [ addBook ] = useMutation(ADD_BOOK, {
    // onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    // onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [page, setPage] = useState('authors')  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit')}>set born</button>
      </div>

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
      />

      <SetBirthYear
        editAuthor={editAuthor}
        authors={useQuery(ALL_AUTHORS)}
        show={page === 'edit'}
      />

    </div>
  )
}

export default App