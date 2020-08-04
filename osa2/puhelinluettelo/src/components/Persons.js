import React from 'react';

const Persons = ({ filteredPersons }) => {
    return(
        <ul>
            {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </ul>
    )
}

export default Persons