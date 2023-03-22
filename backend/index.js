const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Avilable Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

if (process.env.NODE_ENV == 'production') {
    const path = require('path');

    app.get('/*', (req, res) => {
        app.use(express.static(path.join(__dirname, 'build')));
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})