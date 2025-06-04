const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const filterRoutes = require('./routes/filters.route');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/filters', filterRoutes);

module.exports = app;