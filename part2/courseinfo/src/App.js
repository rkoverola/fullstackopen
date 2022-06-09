const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}
const Content = ({course}) => {
  return (
    <>
      {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </>
  )
}
const Total = ({course}) => {
  const all = course.parts.map(p => p.exercises)
  const total = all.reduce((e1, e2) => e1 + e2, 0)
  return (
    <>
      <b>total of {total} exercises</b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content course={course} />
      <Total course={course}/>
    </>
  )
}

const CourseList = ({courses}) => {
  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <CourseList courses={courses}/>
    </div>
  )
}

export default App