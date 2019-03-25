import React from 'react';

const Filter = ({value, onChange}) => {

    return (
        <div>
            <form>
                rajaa näytettäviä: <input value={value} onChange={onChange}/>
            </form>
        </div>
    )
}

export default Filter;