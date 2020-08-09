import React from 'react';

const Persons = ({ filteredPersons, deletePerson }) => {
    return(
        <ul>
            {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} 
            <button onClick={event => deletePerson(event, person.name)}>delete</button></p>)}
        </ul>
    )
}

export default Persons