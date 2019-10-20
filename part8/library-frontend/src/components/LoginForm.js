import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  if (!props.show) return null

  const submit = async (e) => {
    e.preventDefault()
    console.log('login...')
    try {
      const res = await props.login({variables: { username, password }})
      const token = res.data.login.value
      props.saveToken(token)
      localStorage.setItem('library-token', token)
    } catch (error) {
      props.createNotification('error when logging in')
      console.log(error)
    }    
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>       
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm