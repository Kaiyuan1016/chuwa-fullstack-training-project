const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');

const productRouter = require('./routers/product');

app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use('/', productRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});