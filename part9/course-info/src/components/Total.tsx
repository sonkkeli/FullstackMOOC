import React from "react";
import { Course } from '../types'

const Total: React.FC<{ courses: Array<Course> }> = ({courses}) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;