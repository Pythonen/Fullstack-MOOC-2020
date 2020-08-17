import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, showDeleteButton, user, blogs, setBlogs }) => {
    const [like, setLike] = useState(blog.likes)
    const remove = async () => {
        if(window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author || '[no author]'}?`)){
            try {
                await blogService.remove(blog.id, user.token)
                setBlogs(blogs.filter(blg => blg.id !== blog.id))
            }catch(ex){
                console.log(ex)
            }
        }
    }
    const likeBlog = async () => {
        const newBlogObj = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }
        await blogService.update(blog.id,newBlogObj)
        setLike(newBlogObj.likes)
    }
    return(
        <div>
            <div className='titleAuthor'>
                {blog.title} {blog.author}
            </div>
            <br/>
            <div className='all'>
                {blog.url}
                <br/>
                <p>likes: {like} <button onClick={likeBlog}>like</button></p>
                {`Added by ${blog.user !== undefined ? blog.user.name : 'anonymous'}`}
            </div>
            {showDeleteButton && <p ><button onClick={remove}>delete</button></p>}
        </div>
    )}
export default Blog
