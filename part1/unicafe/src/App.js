import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if(props.good + props.neutral + props.bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <StatisticLine text={'good'} value={props.good} />
      <StatisticLine text={'neutral'} value={props.neutral} />
      <StatisticLine text={'bad'} value={props.bad} />
      <StatisticLine text={'average'} value={props.average} />
      <StatisticLine text={'positive'} value={props.positive} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAll = () => good + neutral + bad
  const calculateAverage = () => ((1 * good + 0 * neutral + -1* bad) / calculateAll())
  const calculatePositivePercentage = () => {
    const positive = good / calculateAll()
    const percentage = (100 * positive).toPrecision(3) + ' %'
    return percentage
  } 


  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} text={'good'}/>
      <Button handler={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handler={() => setBad(bad + 1)} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={calculateAverage()} positive={calculatePositivePercentage()}/>
    </div>
  )
}

export default App