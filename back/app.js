const express = require('express');

const productRoutes = require('./routes/product.route');
const filterRoutes = require('./routes/filters.route');
const cors = require('cors');

const app = express();
app.use(cors()); // allow all origins by default
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes);
app.use('/filters', filterRoutes);

module.exports = app;