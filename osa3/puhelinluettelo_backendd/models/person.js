const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')


mongoose.set('useFindAndModify', false)

const url = process.env.MONGO_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
  .then(_ => {
    console.log('Connected to MongoDB')
  }).catch(err => console.log(err.message))

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 3},
  number: {type: String, required: true, unique: true, minlength: 8},
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

module.exports = mongoose.model('Person', personSchema)