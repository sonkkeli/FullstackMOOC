import React, { useState } from 'react'

const SetBirthYear = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log('set birthyear...')
    await props.editAuthor({variables: { name, born }})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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