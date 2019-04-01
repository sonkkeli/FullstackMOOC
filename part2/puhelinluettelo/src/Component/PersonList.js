import React from 'react';

const PersonList = ({persons, whoIsMissing, handleButtonClick}) => {
    const listPeople = () => {
        const missings = persons.filter(
            person => person.name.toLowerCase().includes(whoIsMissing.toLowerCase())
        )
    
        return missings.map(
            person => 
            <p key={person.id}>
                {person.name} {person.number} <button 
                className="btn btn-dark btn-sm" 
                onClick={() => handleButtonClick(person.id, person.name)}
                >poista</button>
            </p>
        )
    }

    return (
        <div>
            {listPeople()}
        </div>        
    )    
}

export default PersonList;