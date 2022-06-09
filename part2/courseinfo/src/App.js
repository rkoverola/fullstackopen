const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}
const Content = ({course}) => {
  return (
    <>
      <p>{course.parts[0].name}{course.parts[0].exercises}</p>
      <p>{course.parts[1].name}{course.parts[1].exercises}</p>
      <p>{course.parts[2].name}{course.parts[2].exercises}</p>
    </>
  )
}
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content course={course} />
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
      }
    ]
  }

  return <Course course={course} />
}

export default App