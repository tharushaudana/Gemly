const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});