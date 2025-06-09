const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authController.registerCustomer);
router.post('/login', authController.loginCustomer);

router.get('/verify', authMiddleware('any'), authController.verifyToken);

module.exports = router;