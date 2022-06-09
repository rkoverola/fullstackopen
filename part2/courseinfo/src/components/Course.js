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

export default Course