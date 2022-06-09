const Header = ({name}) => {
  return (
    <h1>{name}</h1>
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
      <p>Number of exercises {total}</p>
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
        name: 'Fate of a component',
        exercises: 49,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App