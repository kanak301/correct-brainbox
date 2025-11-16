import React, { useEffect, useRef, useState } from 'react'


export default function TimerPanel({ totalTime, updateTime }) {
const [isRunning, setIsRunning] = useState(false)
const [elapsed, setElapsed] = useState(0)
const intervalRef = useRef(null)


useEffect(() => {
if (isRunning) {
intervalRef.current = setInterval(() => {
setElapsed(prev => prev + 1)
}, 1000)
}
return () => clearInterval(intervalRef.current)
}, [isRunning])


function handleStartStop() {
setIsRunning(r => !r)
}


function handleSave() {
// Commit elapsed seconds to parent
updateTime(elapsed)
setElapsed(0)
setIsRunning(false)
}


const displayTotal = totalTime + elapsed


function format(s) {
const h = Math.floor(s / 3600)
const m = Math.floor((s % 3600) / 60)
const sec = s % 60
if (h > 0) return `${h}h ${m}m ${sec}s`
if (m > 0) return `${m}m ${sec}s`
return `${sec}s`
}


return (
<div className="timer-panel">
<div className="timer-display">Studied: <strong>{format(displayTotal)}</strong></div>
<div className="timer-controls">
<button onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
<button onClick={handleSave} disabled={elapsed === 0}>Save Session</button>
</div>
</div>
)
}