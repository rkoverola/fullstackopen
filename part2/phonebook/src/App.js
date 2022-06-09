import { useState } from 'react'

const PersonList = ({persons}) => {
  return (
    <div>
      {persons.map(p => <div key={p.name}>{p.name}</div>)}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input onChange={handleNewNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons}/>
    </div>
  )
}

export default App