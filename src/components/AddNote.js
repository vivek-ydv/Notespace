import React from "react"
import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import alertContext from "../context/alerts/alertContext";
import addnoteimg from '../images/note.svg'

const AddNote = () => {
    const { addNote } = useContext(NoteContext); // get the addNote function from the note context
    const { showAlert } = useContext(alertContext); // get the showAlert function from the alert context
    const [note, setNote] = useState({ title: "", description: "", tag: "" }); // initialize state for the note form inputs

    // function to handle form submission
    const handleClick = (e) => {
        e.preventDefault(); // prevent default form submission behavior
        addNote(note.title, note.description, note.tag); // call the addNote function from the note context with the current note data
        setNote({ title: "", description: "", tag: "" }); // reset the state for the note form inputs
        showAlert('Added Note Sucessfully :)', 'success'); // show an alert message to the user using the showAlert function from the alert context
    }

    // function to handle input changes
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) // update the state for the note form inputs based on user input
    }

    return (
        <>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-6">
                        <h2 style={{ fontWeight: "Bold" }}>Create a <span style={{ color: "#9C27B0", fontWeight: "Bold" }}> Note </span></h2>
                        <p>Add a new note with your info</p>
                        <form>
                            <div className="my-3 material-textfield">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder=" "
                                    value={note.title}
                                    onChange={onChange}
                                />
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                            </div>
                            <div className="my-3 material-textfield">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    name="tag"
                                    placeholder=" "
                                    value={note.tag}
                                    onChange={onChange}
                                />
                                <label htmlFor="tag" className="form-label">
                                    Tag
                                </label>
                            </div>
                            <div className="my-3 material-textfield">
                                <input style={{ height: "70px" }}
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder=" "
                                    value={note.description}
                                    onChange={onChange}
                                />
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                            </div>

                            <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-lg btn-outline-primary mt-2 mb-3" onClick={handleClick}>
                                Add Note
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-4 col-5 d-sm-none  d-md-block ms-5 me-1">
                        <img className="img-fluid d-none d-sm-block" src={addnoteimg} alt='home' />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddNote