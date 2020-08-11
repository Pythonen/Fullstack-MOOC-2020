const mongoose = require('mongoose');


const passw = process.argv[2];


const url = 
`mongodb+srv://fullstack:${passw}@cluster0.1zfez.mongodb.net/persondb?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

const Person = mongoose.model('Person',personSchema);


if(process.argv.length >= 5){

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(res => {
        console.log(`added ${person.name} to the phonebook`)
        mongoose.connection.close()
    }).catch(err => console.log(err))
}


if(process.argv.length < 4){
    console.log('phonebook:')
    Person.find({})
    .then(persons => {
    persons.forEach(person => {
        console.log(person.name, person.number)
    })
    ,mongoose.connection.close()})
    .catch(err => console.log(err))
}
  