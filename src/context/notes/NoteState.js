import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // Store the API endpoint in the host constant
    const host = process.env.REACT_APP_API_URL;

    // Initialize notesInital variable as an empty array
    let notesInital = [];

    // Create a state variable 'notes' using useState hook and set it to notesInital
    const [notes, setNotes] = useState(notesInital)

    // Create a function 'getNotes' to fetch all notes from the server
    const getNotes = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        // Set the notes state with the fetched data
        setNotes(json);
    }

    // Create a function 'addNote' to add a note to the server
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        // Add the new note to the existing notes array and set the notes state
        setNotes(notes.concat(note));
    }

    // Create a function 'deleteNote' to delete a note from the server
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        // Filter out the note with the specified id and set the notes state with the filtered notes
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    }

    // Create a function 'editNote' to edit a note on the server
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // Call the 'getNotes' function to update the state with the edited notes
        getNotes();
    }

    // Return the NoteContext provider component with notes, addNote, deleteNote, editNote and getNotes as values
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
