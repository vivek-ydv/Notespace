const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://vivekydv:vivekCluster0@cluster0.csr861r.mongodb.net/noteSpace?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
