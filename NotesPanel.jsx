import React, { useState } from 'react'


function id() {
return Math.random().toString(36).slice(2, 9)
}


export default function NotesPanel({ notes, addNote, deleteNote }) {
const [text, setText] = useState('')


function handleAdd() {
const trimmed = text.trim()
if (!trimmed) return
const note = { id: id(), text: trimmed, timestamp: Date.now() }
addNote(note)
setText('')
}


return (
<section className="notes-panel">
<div className="editor">
<textarea
value={text}
onChange={e => setText(e.target.value)}
placeholder="Type your note here..."
/>
<div className="editor-actions">
<button onClick={handleAdd}>Save Note</button>
</div>
</div>


<div className="notes-list">
{notes.length === 0 && <p className="muted">No notes yet.</p>}
{notes.map(n => (
<div className="note-card" key={n.id}>
<div className="note-meta">
<small>{new Date(n.timestamp).toLocaleString()}</small>
<button className="del" onClick={() => deleteNote(n.id)}>Delete</button>
</div>
<p className="note-text">{n.text}</p>
</div>
))}
</div>
</section>
)
}