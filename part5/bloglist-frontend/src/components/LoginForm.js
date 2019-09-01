import React from 'react'

const LoginForm = ({
  handleLogin, 
  username, 
  setUsername, 
  password, 
  setPassword
}) => {
  return (
    <div>
      <h2>Login</h2>
      <br/>
      <form onSubmit={handleLogin}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">username</span>
          </div>
            <input className="form-control"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">password</span>
          </div>
            <input className="form-control"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">login</button>
      </form>     
    </div> 
  )  
}

export default LoginForm