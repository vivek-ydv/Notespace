const express = require('express');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

var fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Get all the notes Using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new note Using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            // If there is errors then send the bad request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Destrucutre the data from request body
            const { title, description, tag } = req.body;

            // Create the new note
            const note = new Note({ user: req.user.id, title, description, tag });
            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update a note Using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        // Destrucutre the data from request body
        const { title, description, tag } = req.body;

        // Create the new note
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        };

        // Authenticate
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete a note Using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted 
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        };

        // Authenticate 
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Sucess": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;