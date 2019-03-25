import React from 'react';

const Header = ({course}) => {
    /*Header huolehtii kurssin nimen renderöimisestä*/
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  
  }

export default Header;