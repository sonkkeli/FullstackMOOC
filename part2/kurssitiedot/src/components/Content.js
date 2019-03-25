import React from 'react';
import Part from './Part'

const Content = ({parts}) => {
    /*Content huolehtii osista ja niiden tehtävämääristä*/

    const mapParts  = () => parts.map(part =>
        <Part 
            key={part.id}
            part={part.name} 
            exercises={part.exercises} 
        />
    )

    return (
      <div>
          {mapParts()}      
        </div>    
    )
}

export default Content;