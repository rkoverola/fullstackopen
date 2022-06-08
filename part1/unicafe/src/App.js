import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAll = () => good + neutral + bad

  // FIXME: Divide by zero?
  const calculateAverage = () => ((1 * good + 0 * neutral + -1* bad) / calculateAll())
  const calculatePositivePrecentage = () => good / calculateAll()


  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} text={'good'}/>
      <Button handler={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handler={() => setBad(bad + 1)} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={calculateAverage()} positive={calculatePositivePrecentage()}/>
    </div>
  )
}

export default App