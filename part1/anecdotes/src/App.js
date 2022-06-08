import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const initVotes = new Array(anecdotes.length).fill(0)
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)
  const [mostVoted, setMostVoted] = useState(0)

  const randomizeSelected = () => {
    const randomIndex = Math.round(Math.random() * (anecdotes.length - 1))
    console.log('Setting index to ', randomIndex)
    setSelected(randomIndex)
  }

  // FIXME: Datarace here if update called at the end of the function
  const voteForSelectedIndex = () => {
    const copiedVotes = [...votes]
    copiedVotes[selected] += 1
    setVotes(copiedVotes)
    //updateMostVotedIndex()
  }

  const updateMostVotedIndex = () => {
    const ranked = [...votes].sort()
    const best = ranked[votes.length - 1]
    const bestIndex = votes.indexOf(best)
    console.log('Setting best index to ', bestIndex)
    setMostVoted(bestIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <Button handler={voteForSelectedIndex} text={'vote'}/>
      <Button handler={randomizeSelected} text={'next anecdote'}/>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[mostVoted]}
      </div>
      <div>
        has {votes[mostVoted]} votes
      </div>
      <Button handler={updateMostVotedIndex} text={'refresh'}/>
    </div>
    
  )
}

export default App