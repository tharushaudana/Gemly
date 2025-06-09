const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware('customer'), cartController.getCart);
router.post('/', authMiddleware('customer'), cartController.addToCart);
router.delete('/', authMiddleware('customer'), cartController.removeFromCart);

module.exports = router;