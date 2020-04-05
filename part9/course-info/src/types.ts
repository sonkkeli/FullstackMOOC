export type CourseBase = {
  name: string;
  exerciseCount: number;
}

interface CourseWithDesc extends CourseBase {
  description: string;
}

interface CourseOne extends CourseWithDesc {
  name: "Fundamentals";
}

interface CourseTwo extends CourseBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CourseThree extends CourseWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CourseFour extends CourseWithDesc {
  name: "Dummy";
  level: number;
}

export type Course = CourseOne | CourseTwo | CourseThree | CourseFour;