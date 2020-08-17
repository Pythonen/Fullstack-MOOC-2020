import React from 'react'

const LoginForm = ({ user, password, setUsername, setPassword, handleLogin }) => {
    return(
        <>
            <h1>Log in to application</h1>
            <form onSubmit={handleLogin}>
                <>
                Username
                    <input
                        value={user}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </>
                <br/>
                <>
                    Password
                    <input
                        value={password}
                        name='Password'
                        type='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}
export default LoginForm