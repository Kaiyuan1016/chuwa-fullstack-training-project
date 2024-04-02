const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./controllers/error');
const productRoutes = require('./routers/product');
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const promoRoutes = require('./routers/promo');

const connectDB = require('./db/index');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/promo', promoRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
  
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});