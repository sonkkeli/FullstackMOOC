import React, {useState, useEffect} from 'react';
import './App.css';
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Footer from './components/Footer'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
      .then(setLoaded(true))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log(blogs)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })  
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      createNotification(`Welcome ${user.name}`)
    } catch (exception) {
      createNotification('Incorrect username or password')
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <br/>
      <form onSubmit={handleLogin}>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">username</span>
          </div>
            <input className="form-control"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">password</span>
          </div>
            <input className="form-control"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" class="btn btn-dark">login</button>
      </form>     
    </div> 
  )

  const handleTitleChange = (event) => setNewTitle(event.target.value)

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const handleURLChange = (event) => setNewURL(event.target.value)

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">Title</span>
        </div>
        <input class="form-control"
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">Author</span>
        </div>
        <input class="form-control"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">URL</span>
        </div>
        <input class="form-control"
          value={newURL}
          onChange={handleURLChange}
        />
        </div>
      <button type="submit" class="btn btn-dark">create</button>
    </form>  
  )

  const createNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        createNotification('Blog creation was successful')
      })
      .catch(error => {
        createNotification('Blog creation failed, try again')
        console.log(error)
      })
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('loggedBlogsUser')
    window.location.reload()  
  }

  if(loaded){
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
        <a className="text-light lead">Blogs App</a>
          {user === null 
            ? null 
            : <button onClick={logout} class="btn btn-light">logout</button>}
        </nav>
        <div className="container">
          <br/>
          <h1>Blogs App</h1>
      
          <Notification message={errorMessage} />
      
          {user === null ?
            loginForm() :
            <div>
              <p>{user.name} logged in</p>
              <h2>Blogs</h2>
              <Blog blogs={blogs} />
              <br/>
              <h2>Create new</h2>
              {blogForm()}
            </div>
          }
          <Footer />  
        </div>        
      </div>
    )
  } else {
    return <p>loading</p>
  }

  
}

export default App;
