import React from "react";
import { Course } from '../types'
import Part from './Part'

const Content: React.FC<{ courses: Array<Course>}> = ({courses}) => {
  return (
    <React.Fragment>
      {courses.map((c,i) => <Part course={c} key={`course-${i}`}/>)}
    </React.Fragment>
  )
};

export default Content;