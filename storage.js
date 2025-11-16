export const STORAGE_KEY = 'studyApp_v1'


export function saveData(data) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
} catch (e) {
console.error('Failed to save data', e)
}
}


export function loadData() {
try {
const raw = localStorage.getItem(STORAGE_KEY)
return raw ? JSON.parse(raw) : null
} catch (e) {
console.error('Failed to load data', e)
return null
}
}