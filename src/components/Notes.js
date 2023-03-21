import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import alertContext from "../context/alerts/alertContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";


const Notes = () => {
    const ref = useRef(null);
    const refclose = useRef(null);
    let navigate = useNavigate();

    const { showAlert } = useContext(alertContext);
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            getNotes();
        }
        else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currNote) => {
        ref.current.click(); // ref to launch modal
        setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        showAlert('Updated Note Successfully :)', 'success')
    }

    return (
        <>
            {/* Component to add a new note*/}
            <AddNote />

            {/* Rendering all noteitems */}
            <div className="container container-fluid">
                <h2 style={{ fontWeight: "Bold" }}>Your Notes</h2>
                <div className="card-body">
                    <div className="row my-3">
                        {notes.map((note) => {
                            return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
                        })
                        }
                    </div>
                </div>
            </div>

            {/* Modal  */}
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Launch static backdrop modal
            </button>
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                <div className="display-6" style={{ fontWeight: "bold" }}>Edit Note</div>
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3 material-textfield">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
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
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                    />
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                </div>
                                <div className="my-3 material-textfield">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={onChange}
                                    />
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={refclose}
                            >
                                Close
                            </button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Notes