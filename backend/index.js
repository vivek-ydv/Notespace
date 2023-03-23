const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + '/.env' });
}
 
connectToMongo(); // connection to mongoDB
const app = express();

app.use(cors());
app.use(express.json());

// Avilable Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
}
