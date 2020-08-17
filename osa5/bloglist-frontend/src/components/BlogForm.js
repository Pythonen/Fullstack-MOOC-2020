import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'


const BlogForm = ({ setBlogs, blogs, setMessage, message, blogFromRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [success, setSuccess] = useState(null)


    const addBlog = async (e) => {
        blogFromRef.current.toggleVisibility()
        e.preventDefault()
        const blogObj = {
            title,
            author,
            url,
        }
        const saved = await blogService.create(blogObj)
        setSuccess(saved)
        setBlogs(blogs.concat(saved))
        setMessage(`New blog ${saved.title} by ${saved.author} added!`)
    }

    return(
        <>
            {success !== null ? <Notification message={message}/> : null}
            <h2>Add blog</h2>
            <form onSubmit={addBlog}>
                Title
                <input
                    id='titleId'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <br/>
                Author
                <input
                    id='authorId'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <br/>
                Url
                <input
                    id='urlId'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
                <button type='submit'>Create</button>

            </form>
        </>
    )
}

export default BlogForm