import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const { label } = props

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })
    return(
        <>
            <div style={hideWhenVisible}>
                <p>{props.title}<button onClick={toggleVisibility}>{label}</button></p>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.buttonTitle}</button>
            </div>
        </>
    )
})

Togglable.propTypes = {
    label: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable