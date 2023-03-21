import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import alertContext from "../context/alerts/alertContext";

const Noteitem = (props) => {
    const { deleteNote } = useContext(NoteContext);
    const { showAlert } = useContext(alertContext);

    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-6 col-lg-4">
                <div className="card text-black move-up mb-3">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title me-auto">{note.title}</h5>
                            <i className="fa-solid fa-trash mx-1 p-2" onClick={() => {
                                deleteNote(note._id);
                                showAlert('Deleted Note Successfully :)', 'success');
                            }} />
                            <i className="fa-solid fa-pen-to-square mx-1 p-2" onClick={() => updateNote(note)} />
                        </div>
                    </div>
                    <div className="card-body">
                        <p>{note.tag}</p>
                        <p className="card-text">
                            {note.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Noteitem   