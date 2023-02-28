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

module.exports = router;