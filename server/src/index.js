const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require("./routers/auth");
const errorHandleMiddleware = require("./handlers/errorHandler");
const cartRouter = require('./routers/cart');
const userRouter = require('./routers/user')
const productRouter = require('./routers/product');
const PORT = process.env.PORT || 8080;

app.locals.blackList = new Set();


require('dotenv').config();
const connectDB = require('./db/index');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/', productRouter);

app.set("base", "/api");
app.use(app.get("base"), authRouter);
app.use(app.get("base") + '/user', userRouter);
app.use(app.get("base") + '/cart', cartRouter);
app.use(errorHandleMiddleware);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});