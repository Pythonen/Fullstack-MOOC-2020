import React from 'react'

const Notification = ({ message }) => {
    return(
        <>
            <h2 style={message.toLowerCase().includes('wrong') ? { color : 'red' }
                : { color: 'green' }}>{ message }</h2>
        </>
    )
}

export default Notification