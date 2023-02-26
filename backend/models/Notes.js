const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    decription: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);