import React from 'react';

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return(
    <>
        <h2>Add new</h2>
        <form>
            <div>name: <input value={newName} onChange={handleNameChange}/></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
            <div>
            <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    </>
    )}

export default PersonForm