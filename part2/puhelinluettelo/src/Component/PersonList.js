import React from 'react';

const PersonList = ({persons, whoIsMissing}) => {
    const listPeople = () => {
        const missings = persons.filter(
            person => person.name.toLowerCase().includes(whoIsMissing.toLowerCase())
        )
    
        return missings.map(
            person => <li key={person.name}>{person.name} {person.number}</li>
        )
    }

    return (
        <ul>
            {listPeople()}
        </ul>        
    )
    
}

export default PersonList;