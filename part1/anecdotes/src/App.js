import { useState } from 'react'

const MostVoted = (props) => {
  
  const calculateMostVotedIndex = () => {
    const ranked = [...props.votes].sort()
    const best = ranked[ranked.length - 1]
    const bestIndex = props.votes.indexOf(best)
    return bestIndex
  }
  
  return (
    <>
      <div>
        {props.anecdotes[calculateMostVotedIndex()]}
      </div>
      <div>
        has {props.votes[calculateMostVotedIndex()]} votes
      </div>
    </>
  )
}

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

  const randomizeSelected = () => {
    const randomIndex = Math.round(Math.random() * (anecdotes.length - 1))
    setSelected(randomIndex)
  }

  const voteForSelectedIndex = () => {
    const copiedVotes = [...votes]
    copiedVotes[selected] += 1
    setVotes(copiedVotes)
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
      <MostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
    
  )
}

export default App