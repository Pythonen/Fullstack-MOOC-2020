import React from 'react';

const Notification = ({ message }) => {
    const msg = message.style === 'error' ? <div className='error'>{message.message}</div>
    : (<div className='success'>{message.message}</div>);
    if (message.message === null){
        return null;
    }
    else{return msg;}
    
}

export default Notification;