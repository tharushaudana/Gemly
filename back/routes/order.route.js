const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:id', authMiddleware('customer'), orderController.getOrderDetails);

module.exports = router;