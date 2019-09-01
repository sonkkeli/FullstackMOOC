import React, {useState} from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isBlogAddedByMe = () => {
    var username = JSON.parse(window.localStorage.getItem('loggedBlogsUser')).username
    if(blog.user.username === username){
      return true
    }
    return false
  }

  return (
    <div className="container jumbotron shadow p-4 text-light bg-secondary rounded">
      <p className="d-flex justify-content-between">
        <span onClick={toggleVisibility}>{blog.title} by {blog.author}</span>
        {isBlogAddedByMe ? <button className="btn btn-info" onClick={deleteBlog} value={blog.id}>delete</button> : null}
      </p>
      <div style={showWhenVisible}>
        <p>
          <a href={`http://${blog.url}`}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes
          <button className="ml-3 btn btn-light" onClick={addLike} value={JSON.stringify(blog)}>
            {"<3 like"}
          </button>
        </p>
        <p>
          added by {blog.user.name}
        </p>
      </div>
    </div>
  )
}

export default Blog