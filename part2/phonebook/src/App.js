import { useState } from 'react'

const PersonList = ({persons}) => {
  return (
    <div>
      {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-5913302' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  
  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input onChange={handleNewNameChange} value={newName}/>
        </div>
        <div>
          Number: <input onChange={handleNewNumberChange} value={newNumber}/>
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