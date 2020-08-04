import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState(null)


  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
        })
},[])
  //handleri nimi-inputille
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  //handleri numero-inputille
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const filteredPersons = filter
    ? persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if(!persons.some(person => person.name === newName || person.number === newNumber))
    {
      const Person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(Person))
      setNewName('')
      setNewNumber('')
    }
    else{
      alert(`${newName} is already in phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameFilter={handleNameFilter}/>
      
      <PersonForm newName={newName} addPerson={addPerson}
            handleNameChange={handleNameChange} 
            handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )

}

export default App