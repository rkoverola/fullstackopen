import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: false
    }
    createNote(noteObject)
    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>Create new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder={'Write something here'}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm