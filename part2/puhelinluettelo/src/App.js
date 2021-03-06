import React, { useState, useEffect } from 'react'
import Filter from './Component/Filter'
import personService from './Services/persons'
import PersonList from './Component/PersonList'
import PersonForm from './Component/PersonForm'
import Notification from './Component/Notification'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ whoIsMissing, setWhoIsMissing] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)

    useEffect(() => {
        personService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
        .catch(error => {
            setErrorMessage(`virhe: alkutietojen lataaminen epäonnistui`)
            setTimeout(() => {setErrorMessage(null)}, 3000)
        })
    }, [])

    const addNewPerson = (event) => {
        event.preventDefault()

        // jos on jo, niin update
        if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())){
            if (window.confirm(`${newName} on jo luettelossa, tallennetaanko uudeksi numeroksi ${newNumber}?`)){
                const person = persons.find(p => p.name === newName)
                const changedPerson = {...person, number: newNumber }
                personService
                .update(person.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
                    setErrorMessage(`Numeron päivittäminen onnistui`)
                    setTimeout(() => {setErrorMessage(null)}, 3000)
                })
                .catch(error => {
                    setErrorMessage(`virhe: tietojen päivittäminen epäonnistui`)
                    setTimeout(() => {setErrorMessage(null)}, 3000)
                })
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
                setErrorMessage(`Lisäys onnistui`)
                setTimeout(() => {setErrorMessage(null)}, 3000)
            })
            .catch(error => {
                setErrorMessage(`virhe: henkilön lisääminen epäonnistui`)
                setTimeout(() => {setErrorMessage(null)}, 3000)
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
        const success = false
        if (window.confirm(`Poistetaanko ${name}`)){
            personService
                .deletePerson(id)
            personService
                .getAll()
                .then(tempPersons => {
                    setPersons(tempPersons.filter(person => person.id !== id))
                    setErrorMessage(`Poistaminen onnistui`)
                    setTimeout(() => {setErrorMessage(null)}, 3000)
                })
                .catch(error => {
                    setErrorMessage(`virhe: henkilön poistaminen epäonnistui`)
                    setTimeout(() => {setErrorMessage(null)}, 3000)
                })
        }
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
            <Notification message={errorMessage}/>

            <Filter value={whoIsMissing} onChange={handleFinderChange}/>

            <h3 className="display-4">lisää uusi</h3>
            <PersonForm onSubmit={addNewPerson} valueName={newName} onNameChange={handleNameChange} valueNumber={newNumber} onNumberChange={handleNumberChange}/>

            <h3 className="display-4">numerot</h3>
            <PersonList persons={persons} whoIsMissing={whoIsMissing} handleButtonClick={handleButtonClick}/>            
        </div></div>
    )
}

export default App