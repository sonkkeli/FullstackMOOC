import React, { useState, useEffect } from 'react'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

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
  const [createNewVisibility, setCreateNewVisibility] = useState(false)

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

  const handleTitleChange = (event) => setNewTitle(event.target.value)

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const handleURLChange = (event) => setNewURL(event.target.value)

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
      .then(() => {
        updateBlogs()
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

  const addLike = (event) => {
    event.preventDefault()
    var save = JSON.parse(event.target.value)
    var blogObject = {
      title:save.title,
      author: save.author,
      url: save.url,
      likes: save.likes + 1,
      user: save.user.id
    }

    blogService
      .update(save.id, blogObject)
      .then(updateBlogs())
      .catch(error => {
        createNotification('Like addition failed, try again')
        console.log(error)
      })
  }

  const updateBlogs = () => {
    blogService
      .getAll()
      .then(updatedBlogs => setBlogs(updatedBlogs))
      .catch(error => {
        createNotification('Updating blogs failed, try again')
        console.log(error)
      })
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('loggedBlogsUser')
    window.location.reload()
  }

  const deleteBlog = (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to delete this blog?')){
      var id = e.target.value
      try {
        blogService.remove(id)
        createNotification('Removal successful')
        setBlogs(blogs.filter(b => b.id !== id))
      } catch (error){
        createNotification('Removal failed')
      }
    }
  }

  if(loaded){
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <a className="text-light lead" href="/">Blogs App</a>
          {user === null
            ? null
            : <button onClick={logout} className="btn btn-light">logout</button>}
        </nav>
        <div className="container">
          <br/>
          <h1>Blogs App</h1>

          <Notification message={errorMessage} />

          {user === null
            ? <LoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
            : <div>
              <p>{user.name} logged in</p>
              <h2>Blogs</h2>
              <BlogList
                blogs={blogs}
                addLike={addLike}
                deleteBlog={deleteBlog}
              />
              <br/>
              <BlogForm addBlog={addBlog}
                newTitle={newTitle}
                handleTitleChange={handleTitleChange}
                newAuthor={newAuthor}
                handleAuthorChange={handleAuthorChange}
                newURL={newURL}
                handleURLChange={handleURLChange}
                createNewVisibility={createNewVisibility}
                setCreateNewVisibility={setCreateNewVisibility}
              />
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

export default App
