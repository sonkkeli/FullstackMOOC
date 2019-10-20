
import React from 'react'

const Recommend = (props) => {
  if (!props.show) return null
  if (props.books.loading || props.me.loading) return <p>loading</p>  
  const myFave = props.me.data.me.favoriteGenre
  const books = props.books.data.allBooks.filter(b=> b.genres.includes(myFave))
  
  return (
    <div>
      <h2>recommended books</h2>
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
          {books.map(a =>
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

export default Recommend