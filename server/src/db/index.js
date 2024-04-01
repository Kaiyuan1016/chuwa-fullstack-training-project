const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('debug', true);
mongoose.Promise = Promise;

const connectDB = () => 
    mongoose.connect(process.env.MONGODB_URI, {
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

module.exports = connectDB;