import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green'
  }
  return (
    <div style={style}>
      {notification !== "" && (
         <div className>{notification}</div>
       )}
    </div>
  )
}

export default Notification