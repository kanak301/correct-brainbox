import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());


const client = new MongoClient(process.env.MONGO_URI);
let db, notesCollection, subjectsCollection;

async function initDB() {
    await client.connect();
    db = client.db("studynotes");
    notesCollection = db.collection("notes");
    subjectsCollection = db.collection("subjects");
    console.log("MongoDB connected.");
}
initDB();

app.get("/api/subjects", async (req, res) => {
    const subjects = await subjectsCollection.find().toArray();
    res.json(subjects.map(s => s.name));
});


app.post("/api/subjects", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Missing name" });
        await subjectsCollection.insertOne({ name });
        res.json({ success: true });
});


app.delete("/api/subjects/:name", async (req, res) => {
    const { name } = req.params;
    await subjectsCollection.deleteOne({ name });
    await notesCollection.deleteMany({ subject: name });
    res.json({ success: true });
});


app.get("/api/notes/:subject", async (req, res) => {
    const { subject } = req.params;
    const notes = await notesCollection.find({ subject }).toArray();
    res.json(notes);
});


app.post("/api/notes", async (req, res) => {
    const { subject, text, timestamp } = req.body;
    if (!subject || !text) return res.status(400).json({ error: "Missing fields" });
        const result = await notesCollection.insertOne({ subject, text, timestamp });
        res.json({ _id: result.insertedId, subject, text, timestamp });
});


app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    await notesCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));