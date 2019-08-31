import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <br/>
      <div className="container jumbotron shadow p-3 mb-5 text-light bg-secondary rounded">
        {message}
      </div>
    </div>
  )
}

export default Notification 