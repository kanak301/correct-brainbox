import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import NotesPanel from './components/NotesPanel'
import TimerPanel from './components/TimerPanel'
import { loadData, saveData } from './utils/storage'


const defaultData = {
  subjects: {
    'DSA': { notes: [], totalTime: 0 },
    'AFLL': { notes: [], totalTime: 0 },
    'DDCO': { notes: [], totalTime: 0 },
    'DSA': { notes: [], totalTime: 0 },
    'MCSE': { notes: [], totalTime: 0 },
    'CIE': { notes: [], totalTime: 0 }
  }
}

export default function App(){
  const[data,setData]=useState(()=>loadData() || defaultData)
  const [currentSubject, setCurrentSubject] = useState(()=>Object.keys(data.subjects)[0])

  useEffect(()=>{
    saveData(data)
  }, [data])

  useEffect(()=>{
    if(!data.subjects[currentSubject]){
      const first = Object.keys(data.subjects)[0]
      setCurrentSubject(first||null)
    }
  }, [data,currentSubject])

  function addSubject(name) {
    if (!name) return
    setData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [name]: { notes: [], totalTime: 0 }
     }
    }))
    setCurrentSubject(name)
    }
    function removeSubject(name) {
      setData(prev => {
        const subjects = { ...prev.subjects }
        delete subjects[name]
        return { ...prev, subjects }
      })
    }

    function addNoteToSubject(subject, note) {
      setData(prev => {
        const subj = prev.subjects[subject]
        const nextNotes = [...subj.notes, note]
        return {
          ...prev,
          subjects: {
            ...prev.subjects,
            [subject]: { ...subj, notes: nextNotes }
          }
        }
        })
      }
      function deleteNote(subject, noteId) {
        setData(prev => {
          const subj = prev.subjects[subject]
          const nextNotes = subj.notes.filter(n => n.id !== noteId)
          return {
            ...prev,
            subjects: { ...prev.subjects, [subject]: { ...subj, notes: nextNotes } }
          }
        })
        }

        function updateTimeForSubject(subject, additionalSeconds) {
          setData(prev => {
            const subj = prev.subjects[subject]
            return {
              ...prev,
              subjects: {
                ...prev.subjects,
                [subject]: { ...subj, totalTime: subj.totalTime + additionalSeconds }
                }
              }
            })
          }
        return(
          <div className="app-root">
            <aside className="sidebar-wrap">
            <Sidebar
            subjects={Object.keys(data.subjects)}
            current={currentSubject}
            onSelect={setCurrentSubject}
            addSubject={addSubject}
            removeSubject={removeSubject}
            />
            </aside>


            <main className="main-wrap">
            {currentSubject ? (
            <>
            <div className="top-row">
            <h1 className="subject-title">{currentSubject}</h1>
            <TimerPanel
            totalTime={data.subjects[currentSubject].totalTime}
            updateTime={(secs) => updateTimeForSubject(currentSubject, secs)}
            />
            </div>


            <NotesPanel
            notes={data.subjects[currentSubject].notes}
            addNote={(note) => addNoteToSubject(currentSubject, note)}
            deleteNote={(id) => deleteNote(currentSubject, id)}
            />
            </>
            ) : (
            <div className="empty-state">No subjects. Add one from the sidebar.</div>
            )}
            </main>
            </div>
            )
}

