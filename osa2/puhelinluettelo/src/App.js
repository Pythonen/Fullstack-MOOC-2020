import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import './App.css';
import Services from './services/Services';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState(null)
  const [ message, setMessage ] = useState(
    {message: null, 
    style: null});

  const notificationHandler = (message,style) => {
    setMessage({
        message: message,
        style: style
    });
    setTimeout(() => {
        setMessage({
            message: null,
            style: null
        });
    }, 5000);
};


  useEffect(() => {
    Services.getAll()
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

  //handleri filteröinnille
  const handleNameFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  //lista numeroista jotka vastaa annettua filtteriä
  const filteredPersons = filter
    ? persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    : persons

  const deletePerson = (e, name) => {
    e.preventDefault()
    const person = persons.find(person => person.name === name)
    if(person){
      if(window.confirm(`Poistetaanko ${person.name}`)){
        Services.deleteNum(person.id)
        .then(_ => 
          setPersons(persons.filter(p => p.id !== person.id)),
          notificationHandler(`Deleted ${person.name} successfully`, 'success'))
        .catch(err => { notificationHandler(`Person ${person.name} was already removed! Please refresh page.`, 'error')
        })
      }
    }
  }
  const exists = persons.find(person => person.name === newName)
  const addPerson = (event) => {
    event.preventDefault()
    const Person = {
      name: newName,
      number: newNumber
    }
    if(!exists)
    {
      if(newName !== ''){
        Services.create(Person);
        setPersons(persons.concat(Person))
        notificationHandler(`Added ${newName} successfully`)
        setNewNumber('')
        setNewName('')
      }
      else {
        notificationHandler('Empty not allowed!', 'error');
      }
    }
    else{
      if(window.confirm(`${newName} is already in phonebook, do you want to update?`)){
        Services
        .update(exists.id, Person)
        .then(res => {
          setPersons(persons.filter(p => p.name !== Person.name).concat(res))
          notificationHandler(`Added ${Person.name}`, 'success');
        })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter handleNameFilter={handleNameFilter}/>
      <PersonForm newName={newName} addPerson={addPerson}
            handleNameChange={handleNameChange} 
            handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )

}

export default App;