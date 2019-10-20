import React, { useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'
import { useApolloClient } from '@apollo/react-hooks'

const Recommend = (props) => {
  const client = useApolloClient()
  const [ myRecs, setMyRecs] = useState([])

  if (!props.show) return null
  if (props.me.loading) return <p>loading</p>  
  const myFave = props.me.data.me.favoriteGenre

  const queryBooksOfMyFave = async () => {
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre: myFave }
    })
    setMyRecs(data.allBooks)
  }
 
  queryBooksOfMyFave()

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
          {myRecs.map(a =>
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