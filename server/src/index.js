const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');

const userRouter = require('./routers/user')
const productRouter = require('./routers/product');

app.use(bodyParser.json());

app.use('/', productRouter);
app.use('/', userRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});