require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :data '))

//GET-routet
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person =>{
    res.json(person)
  })
})

app.get('/info', (req, res) => {
  console.log('info')
  res.send(`<p>Phonebook has info for ${Person.length} people</p>
    <p>${Date()}</p>`)
})

//DELETE-route
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    }).catch(err => next(err))
})

//PUT-route eli numeron updatea varten
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const person = {
    name, number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    }).catch(err => next(err))
})

//POST-route
app.post('/api/persons', (req, res, next) => {

  const { name, number } = req.body
  if(name && number){
    const person = new Person({
      name, number
    })
    person.save().then(() => {
      res.status(201).send()
    }).catch(err => { 
      err.name === 'Validation error' ? res.status(400).send(err.message)
        : next(err)
    })}else {
    res.status(400).json({
      error: 'name or num missing'
    })
  }
})
//Middlewaret
// 404
app.use((req,res) => {
  res.status(404).send('Page not found')
})

// Virheenkäsittelijä
app.use((error,req,res) => {
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    res.status(400).send('Virheellinen ID')}
  else{
    console.error(error)
    res.status(500).send()
  }
})
 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))