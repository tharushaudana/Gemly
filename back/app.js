const express = require('express');

const productRoutes = require('./routes/product.route');
const filterRoutes = require('./routes/filters.route');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/filters', filterRoutes);

module.exports = app;