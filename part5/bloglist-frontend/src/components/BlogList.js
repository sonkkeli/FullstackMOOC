import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, addLike, deleteBlog }) => {
  return blogs.sort((a,b) => b.likes - a.likes).map(b => (
    <Blog key={b.id} blog={b} addLike={addLike} deleteBlog={deleteBlog} />
  ))
}

export default BlogList