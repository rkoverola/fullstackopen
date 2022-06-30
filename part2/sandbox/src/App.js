import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'

import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(intialNotes => {
        setNotes(intialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      setUser(parsedUser)
      noteService.setToken(parsedUser.token)
    }
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUsername('')
      setPassword('')
      loginFormRef.current.toggleVisibility()
    } catch(exception) {
      console.log(exception)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportance = (id) => {
    console.log('Toggling importance on id: ' + id)
    const note = notes.find(n => n.id === id)
    const modifiedNote = { ...note, important: !note.important }
    noteService
      .update(id, modifiedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(n => n.important)
  const handleUsernameChange = ({ target }) => { setUsername(target.value) }
  const handlePasswordChange = ({ target }) => { setPassword(target.value) }

  const loginForm = () => {
    return (
      <Togglable buttonLabel={'Log in'} ref={loginFormRef} >
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const noteForm = () => {
    return (
      <Togglable buttonLabel={'Create new'} ref={noteFormRef} >
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }

  const loggedIn = () => {
    const message = user ? `${user.name} logged in` : ''
    return (
      <div>{message}</div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {loggedIn()}
      {loginForm()}
      {noteForm()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {toggleImportance(note.id)}}
          />
        )}
      </ul>

      <Footer/>
    </div>
  )
}

export default App