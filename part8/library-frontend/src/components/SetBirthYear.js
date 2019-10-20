import React, { useState } from 'react'

const SetBirthYear = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) return null
  if (props.authors.loading) return <p>loading</p>

  const authors = props.authors.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()
    console.log('set birthyear...')
    try {
      await props.editAuthor({variables: { name, born }})
    } catch (error) {
      console.log(error)
    }
    
    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name          
          <select onChange={({ target }) => setName(target.value)}>
            <option key="23525" value=""></option>
            {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
        </div>        
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>        
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear