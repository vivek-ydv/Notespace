import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    let notesInital = [{
        "_id": "63fe031339385c64eba541bf",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm1",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-02-28T13:35:15.849Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    },
    {
        "_id": "6415590eca92ad8e081d2ed8",
        "user": "63fb66fbadf02bb42aaba23e",
        "title": "Alarm2",
        "description": "Wakeup early in the morning!",
        "tag": "personal",
        "date": "2023-03-18T06:24:14.417Z",
        "__v": 0
    }
    ]
    const [notes, setNotes] = useState(notesInital)

    return (
        <NoteContext.Provider value={{ notes, setNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;