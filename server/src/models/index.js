require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, {
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

module.exports.User = require('./User');
module.exports.Product = require('./Product');