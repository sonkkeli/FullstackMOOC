import React, { useState } from 'react'
import Filter from './Component/Filter'
import PersonList from './Component/PersonList'
import PersonForm from './Component/PersonForm'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Muumi Mamma', number: '0401234567'},
        { name: 'Muumi Pappa', number: '0401231234'},
        { name: 'Muumi Peikko', number: '0401223567'},
        { name: 'Niisku Neiti', number: '0401234123'}
    ]) 
    // lomakkeen nimikentän ja numerokentän kontrollointiin
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ whoIsMissing, setWhoIsMissing] = useState('')

    const addNewPerson = (event) => {
        event.preventDefault()

        if (persons.map(person => person.name.toLowerCase()).includes(newName)){
            alert(`${newName} on jo luettelossa`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject))
        }        
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFinderChange = (event) => {
        if (event.target.value === ''){
            setWhoIsMissing('')
            // tässä oli joku outo bugi et vikaa kirjainta ei saanu poistettua
            // vaikka kumittikin, niin tällee se ainaki korjaantu...
        } else {
            setWhoIsMissing(event.target.value)
        }
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>            
            <Filter value={whoIsMissing} onChange={handleFinderChange}/>

            <h3>lisää uusi</h3>
            <PersonForm onSubmit={addNewPerson} valueName={newName} onNameChange={handleNameChange} valueNumber={newNumber} onNumberChange={handleNumberChange}/>

            <h3>numerot</h3>
            <PersonList persons={persons} whoIsMissing={whoIsMissing}/>            
        </div>
    )
}

export default App