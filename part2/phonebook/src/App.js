import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({person, removeHandler}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={removeHandler}>Delete</button>
    </div>
  )
}

const PersonList = ({persons, filterString, removeHandler}) => {
  const rawFilter = filterString.toLowerCase()
  const shownPersons = persons.filter(p => p.name.toLowerCase().startsWith(rawFilter))
  return (
    <div>
      {shownPersons.map(p => <Person key={p.name} person={p} removeHandler={() => removeHandler(p)} />)}
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
    personService
      .getAll()
      .then(all => {
        console.log('Data from server ->', all)
        setPersons(all)
      })
  }, [])

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterStringChange = (event) => setFilterString(event.target.value)
  
  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    if(names.includes(newName)) {
      const confirm = window.confirm(`${newName} is already in phonebook. Replace old number with new one?`)
      if(confirm === false) {
        return
      }
      const id = persons.find(p => p.name === newName).id
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .update(id, personObject)
        .then(updatedPerson => {
          console.log('Data from updating ->', updatedPerson)
          const updatedPersons = persons.map(p => p.id === id ? updatedPerson : p)
          setPersons(updatedPersons)
        })
        .catch(error => alert('Updating failed.'))
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .add(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => alert('Adding failed.'))
    }
  }

  const removePerson = (person) => {
    const confirm = window.confirm('Are you sure you want to delete ' + person.name)
    if(confirm === false) {
      return  
    }
    personService
      .remove(person)
      .then(response => {
        console.log('Response from server ->', response)
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => alert('Deletion failed.'))
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
      <PersonList
        persons={persons}
        filterString={filterString}
        removeHandler={removePerson}
      />
    </div>
  )
}

export default App