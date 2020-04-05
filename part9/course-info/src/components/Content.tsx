import React from "react";
import { Course } from '../types'

const Content: React.FC<{ courses: Array<Course>}> = ({courses}) => {
  return (
    <React.Fragment>
      {courses.map(c => <p>{c.name} {c.exerciseCount}</p>)}
    </React.Fragment>
  )
};

export default Content;