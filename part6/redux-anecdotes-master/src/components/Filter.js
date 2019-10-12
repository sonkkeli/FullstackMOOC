import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({store}) => {
  const handleChange = (event) => {
    store.dispatch(setFilter(event.target.value))
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      filter <input onChange={handleChange} name='filter'/>
    </div>
  )
}
export default Filter