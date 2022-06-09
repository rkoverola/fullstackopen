import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterWidget = ({handler, filterString}) => {
  return (
    <div>Filter shown with <input onChange={handler} value={filterString}/></div>
  )
}

const PersonForm = ({nameHandler, numberHandler, addHandler, newName, newNumber}) => {
  return (
    <form>
        <div>
          Name: <input onChange={nameHandler} value={newName}/>
        </div>
        <div>
          Number: <input onChange={numberHandler} value={newNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addHandler}>Add</button>
        </div>
      </form>
  )
}

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const PersonList = ({persons, filterString}) => {
  const rawFilter = filterString.toLowerCase()
  const shownPersons = persons.filter(p => p.name.toLowerCase().startsWith(rawFilter))
  return (
    <div>
      {shownPersons.map(p => <Person key={p.name} person={p}/>)}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    console.log('Using effect')
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('Data from server ->', response.data)
        setPersons(response.data)
      })
  }, [])

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
      <FilterWidget handler={handleFilterStringChange} filterString={filterString}/>
      <h2>Add new</h2>
      <PersonForm 
        nameHandler={handleNewNameChange}
        numberHandler={handleNewNumberChange}
        addHandler={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filterString={filterString}/>
    </div>
  )
}

export default App