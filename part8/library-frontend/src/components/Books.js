import React, { useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'
import { useApolloClient } from '@apollo/react-hooks'

const Books = (props) => {
  const client = useApolloClient()
  const [genre, setGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(null)

  if (!props.show) return null
  if (props.books.loading) return <p>loading</p>
  const books = props.books.data.allBooks
  const genres = []
  books.map(b => b.genres.map(g => genres.push(g)))

  const handleChange = async (genre) => {
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre: genre }
    })
    setFilteredBooks(data.allBooks)
  }

  const showBooks = filteredBooks ? filteredBooks : books

  if (genre) {
    handleChange(genre)
  }
  
  return (
    <div>
      <h2>books</h2>

      <div>
        filter by genre          
        <select onChange={(event)=> setGenre(event.target.value)} >
          <option key="235255" value=""></option>
          {genres.map(g => <option key={Math.floor(Math.random()*1000)} value={g}>{g}</option>)}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {showBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books