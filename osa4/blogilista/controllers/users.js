const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if(username.length < 3 || password.length < 3 ) {
        return res.status(400).json({ error: 'username or password too short' })
    }

    const user = new User ({
        username,
        name,
        passwordHash,
    })
    try {
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch(err){
        next(err)
    }
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
        .populate('blogs')
    res.json(users.map(user => user.toJSON()))
})

module.exports = userRouter