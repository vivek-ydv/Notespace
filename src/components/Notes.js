import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <>
            <AddNote />
            <div className="container">
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} note={note} />;
                    })
                    }
                </div>
            </div>
        </>
    )
}
export default Notes