import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    let notesInital = [];
    const [notes, setNotes] = useState(notesInital)

    // Get all notes
    const getNotes = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjY2ZmJhZGYwMmJiNDJhYWJhMjNlIn0sImlhdCI6MTY3NzUyODM0NH0.19mDbJc1WTbx76F3HKhUMXYM2uCVFVUx6iGxH0jh1bU",
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjY2ZmJhZGYwMmJiNDJhYWJhMjNlIn0sImlhdCI6MTY3NzUyODM0NH0.19mDbJc1WTbx76F3HKhUMXYM2uCVFVUx6iGxH0jh1bU",
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjY2ZmJhZGYwMmJiNDJhYWJhMjNlIn0sImlhdCI6MTY3NzUyODM0NH0.19mDbJc1WTbx76F3HKhUMXYM2uCVFVUx6iGxH0jh1bU",
            },
        });
        // Logic to delete in client
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjY2ZmJhZGYwMmJiNDJhYWJhMjNlIn0sImlhdCI6MTY3NzUyODM0NH0.19mDbJc1WTbx76F3HKhUMXYM2uCVFVUx6iGxH0jh1bU",
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // Logic to edit in client
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;