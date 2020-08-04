import React from 'react'

const Filter = ({ handleNameFilter }) => {
    return (
        <div>filter shown with: <input onChange={handleNameFilter}/></div>
    )
}

export default Filter