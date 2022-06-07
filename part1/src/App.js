const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Johann"
  const age = 51

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Simon" age={16 + 10} />
      <Hello name={name} age={age} />
    </>
  )
}

export default App
