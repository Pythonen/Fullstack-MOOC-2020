const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { getTokenFrom } = require('./middlewares/jwtAuth')

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use(getTokenFrom)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

module.exports = app