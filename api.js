const API = "http://localhost:5001/api";

export async function getSubjects() {
  const res = await fetch(`${API}/subjects`);
  return res.json();
}

export async function addSubject(name) {
  await fetch(`${API}/subjects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
}

export async function removeSubject(name) {
  await fetch(`${API}/subjects/${name}`, { method: "DELETE" });
}

export async function getNotes(subject) {
  const res = await fetch(`${API}/notes/${subject}`);
  return res.json();
}

export async function addNote(note) {
  await fetch(`${API}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });
}

export async function deleteNote(id) {
  await fetch(`${API}/notes/${id}`, { method: "DELETE" });
}
