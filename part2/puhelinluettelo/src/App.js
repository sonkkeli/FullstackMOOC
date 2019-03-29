import React, { useState, useEffect } from 'react'
import Filter from './Component/Filter'
import personService from './Services/persons'
import PersonList from './Component/PersonList'
import PersonForm from './Component/PersonForm'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ whoIsMissing, setWhoIsMissing] = useState('')

    useEffect(() => {
        personService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const addNewPerson = (event) => {
        event.preventDefault()

        // jos on jo, niin update
        if (persons.map(person => person.name.toLowerCase()).includes(newName)){
            if (window.confirm(`${newName} on jo luettelossa, tallennetaanko uudeksi numeroksi ${newNumber}?`)){
                const person = persons.find(p => p.name === newName)
                const changedPerson = {...person, number: newNumber }
                personService
                .update(person.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.name !== newName ? person : returnedPerson)
                )})
            }
        // jos ei, niin lisätään
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
            })
        }
        // molemmissa tapauksissa tyhjennetään tekstikentät   
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleButtonClick = (id, name) => {
        if (window.confirm(`Poistetaanko ${name}`)){
            personService.deletePerson(id)
        }
        // jotta päivittyy heti, eikä vasta F5 jälkeen, niin filteröidään se pois
        personService
        .getAll()
        .then(tempPersons => {
            setPersons(tempPersons.filter(person => person.id !== id))
        })
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
        <div className="container"><div className="text-center">
            <h2 className="display-3">Puhelinluettelo</h2>            
            <Filter value={whoIsMissing} onChange={handleFinderChange}/>

            <h3 className="display-4">lisää uusi</h3>
            <PersonForm onSubmit={addNewPerson} valueName={newName} onNameChange={handleNameChange} valueNumber={newNumber} onNumberChange={handleNumberChange}/>

            <h3 className="display-4">numerot</h3>
            <PersonList persons={persons} whoIsMissing={whoIsMissing} handleButtonClick={handleButtonClick}/>            
        </div></div>
    )
}

export default App