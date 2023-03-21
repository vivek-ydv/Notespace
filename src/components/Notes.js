import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import alertContext from "../context/alerts/alertContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import nonoteimg from '../images/nonote.svg'

const Notes = () => {
    const ref = useRef(null); // Ref to launch modal
    const refclose = useRef(null); // Ref to close modal
    let navigate = useNavigate(); // Navigate hook for redirecting to login page

    // Getting the showAlert, notes, getNotes, and editNote functions from their respective contexts
    const { showAlert } = useContext(alertContext);
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" }); // State for the note being edited

    useEffect(() => {
        // Checking if user is logged in by checking for a token in local storage
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            getNotes();
        }
        else {
            // Redirecting to login page if user is not logged in
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    // Function to handle changes in the input fields
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // Function to update the note being edited in state and launch the modal
    const openNoteUpdateModal = (currNote) => {
        ref.current.click();
        setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
    }

    /* Function to handle click on the Update Note button in the modal
       This function calls the editNote function to update the note on the backend. */
    const updateNoteOnBackend = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click(); // Closing the modal
        showAlert('Updated Note Successfully :)', 'success') // Showing a success alert
    }

    return (
        <>
            {/* Component to add a new note*/}
            <AddNote />

            {/* Rendering all noteitems */}
            <div className="container container-fluid ">
                <h2 className="mb-5" style={{ fontWeight: "Bold" }}>Your <span style={{ color: "#9C27B0", fontWeight: "Bold" }}> Notes </span></h2>

                {/* Checking if there are no notes */}
                {notes.length === 0 ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img style={{ width: "15%", marginRight: "1rem" }} src={nonoteimg} alt="no-notes-to-show" />
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>Add Your First Note :)</h3>
                    </div>
                ) : (
                    <div className="card-body">
                        <div className="row my-3">
                            {/* Rendering all the notes */}
                            {notes.map((note) => (
                                <Noteitem key={note._id} note={note} openNoteUpdateModal={openNoteUpdateModal} />
                            ))}
                        </div>
                    </div>
                )}
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
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={updateNoteOnBackend}>
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