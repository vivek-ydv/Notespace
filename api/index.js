const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

connectToMongo(); // connection to mongoDB
const app = express();

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

if (process.env.API_PORT) {
    app.listen(process.env.API_PORT, () => {
        console.log(`Listening on port http://localhost:${process.env.API_PORT}`);
    });
}
module.exports = app;