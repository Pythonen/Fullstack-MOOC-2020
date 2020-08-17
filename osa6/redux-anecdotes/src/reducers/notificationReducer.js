export const setNotification = (message) => {
    const newNotif = { message: message}
    console.log(message)
    return {
        type: 'SET_NOTIF',
        data: newNotif,
  }
}
  export const removeNotification = () => {
    return {
      type: 'CLEAR_NOTIF',
    }
  }
  
  const initialState = {
    message: '',
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIF':
        return action.data.message
  
      case 'CLEAR_NOTIF':
        return initialState
  
      default:
        return state
    }
  }
  
  export default reducer