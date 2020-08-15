const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const testBlog = {
    title: 'Finishing part 4',
    author: 'Aleksi Puttonen',
    url: 'https://www.example.com/',
    likes: 2
}


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    /* const newUser =  */await user.save()
    for(let blog of helper.blogs){
        await new Blog(blog).save()
    }
/*     await new User({
        username: 'PythonenTest',
        password: 'testisalasana',
        name: 'AleksiTest',
        blogs: []
    }).save() */
})


describe('/api/blogs', () => {
    test('HTTP GET', async () => {
        const res = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(res.body.length).toBe(helper.blogs.length)
    })
    test('ids must be form of id not _id', async () => {
        const res = await api.get('/api/blogs')
        const id = res.body.map(blog => blog.id)
        expect(id).toBeDefined()
    })

    test('HTTP POST with a valid blog', async () => {
        const usr = { username: 'testis', name: 'testis2', password: 'testisalasana' }
        await api.post('/api/users').send(usr)
        const loginResponse = await api.post('/api/login').send(usr)
        await api.post('/api/blogs')
            .set('Authorization',`${loginResponse.body.token}`)
            .send(testBlog)
        const res = await api.get('/api/blogs')
            .expect(200).expect('Content-Type',/application\/json/)
        expect(res.body).toHaveLength(helper.blogs.length)
    })

    test('HTTP POST with likes undefined', async () => {
        //const users = await usersInDb()
        const newBlog = {
            title: 'Would like to try GatsbyJS sometime',
            author: 'Aleksi Puttonen',
            url: 'example.com',
        }
        const usr = { username: 'testis', name: 'testis2', password: 'testisalasana' }
        await api.post('/api/users').send(usr)
        const loginResponse = await api.post('/api/login').send(usr)
        await api.post('/api/blogs')
            .set('Authorization',`${loginResponse.body.token}`)
            .send(newBlog)
        expect(201)
        const res = await api.get('/api/blogs')
        const likes = res.body.map(blog => blog.likes)
        //console.log(likes)
        expect(likes).toBeDefined()
    })

    test('HTTP POST with a invalid blog', async () => {
        //const users = await usersInDb()
        const newBlog = {
            author: 'Aleksi Puttonen',
            url: 'example.com',
            likes: 100
        }
        const usr = { username: 'testis', name: 'testis2', password: 'testisalasana' }
        await api.post('/api/users').send(usr)
        const loginResponse = await api.post('/api/login').send(usr)
        await api.post('/api/blogs')
            .set('Authorization',`${loginResponse.body.token}`)
            .send(newBlog)
        expect(400)
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.blogs.length)
    })

    test('HTTP POST with invalid token', async () => {
        const newBlog = {
            title: 'Would like to try GatsbyJS sometime',
            author: 'Aleksi Puttonen',
            url: 'example.com',
        }
        const usr = { username: 'testis', name: 'testis2', password: 'testisalasana' }
        await api.post('/api/users').send(usr)
        const loginResponse = await api.post('/api/login').send(usr)
        await api.post('/api/blogs')
            .set('Authorization',`${loginResponse}`)
            .send(newBlog)
        expect(401)
    })
})

describe('/api/blogs/:id', () => {
    test('Deleting blog should return 204', async () => {
        const res = await api.get('/api/blogs')
        const firstId = await res.body[0].id
        await api.delete(`/api/blogs/${firstId}`)
        expect(204)
    })
    test('Updating likes of the blog', async () => {
        const blog = { likes: 3 }
        const res = await api.get('/api/blogs')
        const lastId = await res.body[res.body.length - 1].id
        await api.put(`/api/blogs/${lastId}`).send(blog)
    })
})

describe('/api/users', () => {
    test('Posting credentials with too short credentials', async () => {
        const notValid = {
            username: 'wq',
            name: 'aleksi',
            password: 'qq'
        }
        const res = await api.post('/api/users')
            .send(notValid)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('username or password too short')
    })
    test('Posting user with valid credentials', async () => {
        const valid = {
            username: 'Pythonen',
            name: 'Aleksi',
            password: 'Salasana'
        }
        await api.post('/api/users')
            .send(valid)
            .expect(201)
    })
})

afterAll(() => {
    mongoose.connection.close()
})