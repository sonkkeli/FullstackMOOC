import React from 'react';

const Total = ({parts}) => {
    /*Total huolehtii tehtävien yhteismäärästä*/
    const countExercises = parts.reduce((total, num) => total + num.exercises, 0)

    return (
        <div>
            <p>
                yhteensä {countExercises} tehtävää
            </p>
        </div>
    )
}

export default Total;