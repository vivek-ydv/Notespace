const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

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