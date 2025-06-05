const express = require('express');
const router = express.Router();

const payhereService = require('../services/payhere.service');

router.post('/notify', async (req, res) => {
    try {
        const order = await payhereService.handleNotify(req.body);
        console.log('Payment received and order updated:', order.id);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling payment notification:', error);
        res.status(500).json({ error: 'Failed to process payment notification' });
    }
});

module.exports = router;