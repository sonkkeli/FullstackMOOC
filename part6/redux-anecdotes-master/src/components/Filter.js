import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      filter <input onChange={handleChange} name='filter'/>
    </div>
  )
}

const ConnectedFilter = connect(null, {setFilter})(Filter)
export default ConnectedFilter;