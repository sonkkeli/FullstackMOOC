import React from 'react';
import Course from './components/Course'

const App = ({courses}) => {
    const mapCourses  = () => courses.map(course =>
        <Course 
            key={course.id}
            course={course} 
        />
    )

    return (
        <div>
            {mapCourses()}  
        </div>
    )
}

export default App;