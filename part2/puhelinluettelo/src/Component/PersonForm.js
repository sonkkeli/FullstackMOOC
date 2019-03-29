import React from 'react';

const PersonForm = ({onSubmit, valueName, onNameChange, valueNumber, onNumberChange}) => {

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                nimi: <input value={valueName} onChange={onNameChange}/>
            </div>
            <div className="form-group">
                numero: <input value={valueNumber} onChange={onNumberChange} />
            </div>
            <div >
                <button type="submit" className="btn btn-dark">lisää</button>
            </div>
        </form>
    )    
}

export default PersonForm;