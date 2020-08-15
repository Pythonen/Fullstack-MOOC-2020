const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()


//GETIT
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.json(blog)
    }catch(ex) {
        next(ex)
    }
})

//POST
blogRouter.post('/', async (request, response, next) => {
    try {
        const { title, author, url, likes } = request.body
        const decoded = jwt.verify(request.token, process.env.SECRET)
        if(!request.token || !decoded.id || jwt.verify(request.token) !== decoded ){
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        if(!request.body.title || !request.body.url){
            return response.status(400).json({ error: 'Bad request' })
        }
        const user = await User.findById(decoded.id)
        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id
        })

        if (!blog.likes) {
            blog.likes = 0
        }
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        return response.status(201).json(result.toJSON())
    }catch(err){
        //console.log(err)
        next(err)
    }
})

//DELETE
blogRouter.delete('/:id', async (req, res, next) => {
    const blogId = req.params.id
    const token = req.token
    try{
        const blog = await Blog.findById(blogId)
        const decoded = jwt.verify(token, process.env.SECRET)
        if(!token || !decoded.id){
            return res.status(400).json({ error: 'invalid token or it is missing' })
        }
        const user = await User.findById(decoded.id)
        if(blog.user.toString() !== user._id.toString()){
            return res.status(401).json({ error: 'invalid token' })
        }
        await Blog.findByIdAndDelete(blogId)
        res.status(204).end()
    }
    catch(err) {
        next(err)
    }
})

blogRouter.put('/:id', async (req, res, next) => {
    try{
        const body = await req.body
        const blog = {
            likes: body.likes
        }
        const updated = await Blog.findByIdAndUpdate(req.params.id, blog)
        res.json(updated)
    }catch(err){
        next(err)
    }
})

module.exports = blogRouter