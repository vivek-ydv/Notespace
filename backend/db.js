const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/noteApp";

const connectToMongo = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoDB sucessfully :)");
    })
}

module.exports = connectToMongo;