import { useState } from 'react'

const PersonList = ({persons, filterString}) => {
  const rawFilter = filterString.toLowerCase()
  const shownPersons = persons.filter(p => p.name.toLowerCase().startsWith(rawFilter))
  return (
    <div>
      {shownPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterStringChange = (event) => setFilterString(event.target.value)
  
  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with <input onChange={handleFilterStringChange} value={filterString}/>
      <h2>Add new</h2>
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
      <PersonList persons={persons} filterString={filterString}/>
    </div>
  )
}

export default App