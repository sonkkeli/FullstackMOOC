import React from "react";
import { Course } from '../types'

const Part: React.FC<{ course: Course }> = ({course}) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (course.name){
    case "Fundamentals":
      return <p>{course.name} {course.exerciseCount} {course.description}. </p>
    case "Using props to pass data":
      return <p>{course.name} {course.exerciseCount} {course.groupProjectCount} </p>
    case "Deeper type usage":
      return <p>{course.name} {course.exerciseCount} {course.description}. <a href={course.exerciseSubmissionLink}>{course.exerciseSubmissionLink}</a> </p>
    case "Dummy":
      return <p>{course.name} {course.exerciseCount} {course.description}. Dummylevel: {course.level}</p>
    default:
      return assertNever(course);
  }
}

export default Part;