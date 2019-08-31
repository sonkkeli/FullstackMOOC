import React from 'react'

const Blog = ({ blogs }) => {
  return blogs.map(b => <div key={b.id}> {b.title} by {b.author} </div>)
}

export default Blog