const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo(); // connection to mongoDB
const app = express();

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
}

module.exports = app;