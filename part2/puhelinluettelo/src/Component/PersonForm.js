import React from 'react';

const PersonForm = ({onSubmit, valueName, onNameChange, valueNumber, onNumberChange}) => {

    return (
        <form onSubmit={onSubmit}>
            <div>
                nimi: <input value={valueName} onChange={onNameChange}/>
            </div>
            <div>
                numero: <input value={valueNumber} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )    
}

export default PersonForm;