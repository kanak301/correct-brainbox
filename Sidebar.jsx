import React, { useState } from 'react'


export default function Sidebar({ subjects, current, onSelect, addSubject, removeSubject }) {
const [text, setText] = useState('')


function handleAdd() {
const name = text.trim()
if (!name) return
addSubject(name)
setText('')
}


return (
<div className="sidebar">
<h2 className="brand">StudyNotes</h2>


<div className="subjects">
{subjects.map(s => (
<div key={s} className={`subject-item ${s === current ? 'active' : ''}`}>
<button className="subject-btn" onClick={() => onSelect(s)}>{s}</button>
<button className="remove-subject" onClick={() => removeSubject(s)}>×</button>
</div>
))}
</div>


<div className="add-subject">
<input value={text} onChange={e => setText(e.target.value)} placeholder="New subject" />
<button onClick={handleAdd}>Add</button>
</div>


<footer className="sidebar-footer">Local only • saved in browser</footer>
</div>
)
}