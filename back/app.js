const express = require('express');

const testRoutes = require('./routes/test.route');

const app = express();
app.use(express.json());

app.use('/test', testRoutes);

module.exports = app;