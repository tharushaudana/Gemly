const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create-session', authMiddleware('customer'), checkoutController.checkoutControllerFunction);

module.exports = router;