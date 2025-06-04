const express = require('express');

const productRoutes = require('./routes/product.route');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);

module.exports = app;