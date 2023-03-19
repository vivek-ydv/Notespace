import React from "react"
import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
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
                <h2 style={{ fontWeight: "Bold" }}>Create A Note</h2>
                <p>Add a new note with your info</p>
                <form>
                    <div className="mb-1">
                        <label htmlFor="title" className="form-label">
                            {/* Title  */}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Title *"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="tag" className="form-label">
                            {/* Tag */}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            placeholder="Tags *"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="description" className="form-label">
                            {/* Description */}
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows={2}
                            defaultValue={""}
                            placeholder="Description *"
                            onChange={onChange}
                        />
                    </div>

                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>
                        Add Note
                    </button>
                </form>
            </div>
        </>
    )
}
export default AddNote