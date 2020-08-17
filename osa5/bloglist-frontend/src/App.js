import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    //const [newBlog, setNewBlog] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    //Haetaan selaimen localstoragesta loggedBlogUseria vastaava user
    //Jos sellainen löytyy, parsetaan token ja asetetaan se käyttäjälle ettei aina
    //sivua refreshatessa tarvitse kirjautua uudestaan sisään.
    useEffect(() => {
        const loggedJSON = window.localStorage.getItem('loggedBlogUser')
        if(loggedJSON){
            const user = JSON.parse(loggedJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const user = await loginService.login({
                username, password
            })
            //Kun kirjaudutaan, asetetaan loggedBlogUser:n arvoksi user.

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch(ex) {
            setMessage('Wrong credentials')
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }

    const blogFromRef = useRef()

    if ( user === null ){
        return(
            <>
                <LoginForm setPassword={setPassword}
                    setUsername={setUsername}
                    handleLogin={handleLogin}
                />
                <Notification message={message}/>
            </>
        )
    }
    return (
        <>
            <p>{user.name} logged in <button onClick={() => window.localStorage.removeItem(
                'loggedBlogUser')}>logout</button></p>
            <Togglable label='New blog' buttonTitle='Cancel' ref={blogFromRef}>
                <BlogForm user={user} setBlogs={setBlogs} blogs={blogs}
                    message={message} setMessage={setMessage} blogFromRef={blogFromRef}/>
            </Togglable>
            <h2>blogs</h2>
            {blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1).map((blog, i) =>
                <Togglable key={i} label='view' buttonTitle='hide'
                    title={blog.title}>
                    <Blog key={blog.id} blog={blog} user={user} showDeleteButton={blog.user === undefined || blog.user.id === user.id ? '' : 'none'}
                        blogs={blogs} setBlogs={setBlogs}/>
                </Togglable>
            )}
        </>
    )
}

export default App