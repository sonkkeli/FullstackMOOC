import React from 'react'

const Notification = ({store}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return store.getState().notifications !== 'HIDDEN' ? 
    <div style={style}>
      {store.getState().notifications}
    </div> : null
}

export default Notification