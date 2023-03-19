import React from "react"
import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });
    const { addNote } = context;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder=""
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows={3}
                            defaultValue={""}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            placeholder=""
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>
                        Add Note
                    </button>
                </form>
            </div>
        </>
    )
}
export default AddNote