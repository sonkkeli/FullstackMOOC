import React from "react";
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import { Course } from './types'

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Course[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Dummy",
      exerciseCount: 5,
      description: "This is a dummy course",
      level: 150
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;