require('dotenv').config();
const express = require('express');
const cors = require('cors'); // import cors
const crypto = require('crypto');

const app = express();
app.use(cors()); // allow all origins by default
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_SECRET = process.env.MERCHANT_SECRET;

app.post('/generate-hash', (req, res) => {
    const {
        order_id,
        amount,
        currency
    } = req.body;

    if (!order_id || !amount || !currency) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format the amount to 2 decimal places (like PHP's number_format)
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Uppercase MD5 of merchant secret
    const secretMd5 = crypto.createHash('md5').update(MERCHANT_SECRET).digest('hex').toUpperCase();

    // Combine string for hash
    const hashString = MERCHANT_ID + order_id + formattedAmount + currency + secretMd5;

    // Final uppercase MD5 hash
    const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

    return res.json({ hash, order_id, amount: formattedAmount, currency });
});

app.post('/notify', (req, res) => {
    console.log('Received notify:', req.body);
    res.json({ status: 'success', message: 'Data logged successfully.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
